import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, AIMessage as LangChainAIMessage } from '@langchain/core/messages'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import { NextResponse } from 'next/server'
import { Message } from 'ai'
import { supabase } from '@/lib/supabase'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set')
}

// Initialize OpenAI
const model = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Initialize conversation chain for each request
const createConversationChain = () => {
  const memory = new BufferMemory()
  return new ConversationChain({
    llm: model,
    memory: memory,
  })
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json()
    
    if (!messages?.length) {
      return NextResponse.json(
        { error: 'No messages provided' },
        { status: 400 }
      )
    }

    const lastMessage = messages[messages.length - 1]
    
    // Convert the message history to LangChain format
    const formattedHistory = messages.slice(0, -1).map((m) => 
      m.role === 'user' 
        ? new HumanMessage(m.content)
        : new LangChainAIMessage(m.content)
    )

    // Create a new conversation chain for this request
    const chain = createConversationChain()

    // Initialize memory with previous messages
    for (let i = 0; i < formattedHistory.length; i += 2) {
      const humanMessage = formattedHistory[i]
      const aiMessage = formattedHistory[i + 1]
      if (humanMessage && aiMessage) {
        await chain.call({
          input: humanMessage.content,
        })
      }
    }

    // Get response from LangChain
    const response = await chain.call({
      input: lastMessage.content,
    })

    // Log the interaction
    try {
      await supabase
        .from('logs')
        .insert({
          event_type: 'agent_interaction',
          message: lastMessage.content,
          metadata: {
            response: response.response,
            agent_id: 'default'
          }
        })
    } catch (dbError) {
      // Don't fail the request if logging fails
      console.error('Database logging error:', dbError)
    }

    return NextResponse.json({ 
      role: 'assistant',
      content: response.response 
    })
  } catch (error: any) {
    console.error('Agent error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
