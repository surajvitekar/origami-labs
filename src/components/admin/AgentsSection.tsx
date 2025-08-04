'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Agent {
  id: string
  name: string
  description: string
  config: Record<string, any>
  created_at: string
}

export default function AgentsSection() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [newAgent, setNewAgent] = useState({
    name: '',
    description: '',
    config: {}
  })

  useEffect(() => {
    loadAgents()
  }, [])

  async function loadAgents() {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAgents(data || [])
    } catch (error) {
      console.error('Error loading agents:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createAgent(e: React.FormEvent) {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('agents')
        .insert([newAgent])

      if (error) throw error

      setNewAgent({ name: '', description: '', config: {} })
      loadAgents()
    } catch (error) {
      console.error('Error creating agent:', error)
    }
  }

  async function deleteAgent(id: string) {
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadAgents()
    } catch (error) {
      console.error('Error deleting agent:', error)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">AI Agents</h2>

      <form onSubmit={createAgent} className="mb-6 space-y-4">
        <div>
          <input
            type="text"
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
            placeholder="Agent name"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <textarea
            value={newAgent.description}
            onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
            placeholder="Agent description"
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Agent
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-4 border rounded"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{agent.name}</h3>
                <button
                  onClick={() => deleteAgent(agent.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{agent.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
