import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, AIMessage } from '@langchain/core/messages'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import { NextResponse } from 'next/server'
import { Message } from 'ai'
import { supabase } from '@/lib/supabase'

// Initialize OpenAI
const model = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// Initialize memory
const memory = new BufferMemory()

// Initialize conversation chain
const chain = new ConversationChain({
  llm: model,
  memory: memory,
})

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
    const history = messages.map((m) => 
      m.role === 'user' 
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    )

    // Get response from LangChain
    const response = await chain.call({
      input: lastMessage.content,
    })

    // Log the interaction
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
