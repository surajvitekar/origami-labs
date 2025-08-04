'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ApiKey {
  id: string
  name: string
  key: string
  created_at: string
}

export default function ApiKeysSection() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApiKeys()
  }, [])

  async function loadApiKeys() {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setApiKeys(data || [])
    } catch (error) {
      console.error('Error loading API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createApiKey(e: React.FormEvent) {
    e.preventDefault()
    try {
      const newKey = {
        name: newKeyName,
        key: `ok_${crypto.randomUUID()}`
      }

      const { error } = await supabase
        .from('api_keys')
        .insert([newKey])

      if (error) throw error

      setNewKeyName('')
      loadApiKeys()
    } catch (error) {
      console.error('Error creating API key:', error)
    }
  }

  async function deleteApiKey(id: string) {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadApiKeys()
    } catch (error) {
      console.error('Error deleting API key:', error)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">API Keys</h2>

      <form onSubmit={createApiKey} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="Key name"
            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Key
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {apiKeys.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between p-4 border rounded"
            >
              <div>
                <h3 className="font-medium">{key.name}</h3>
                <p className="text-sm text-gray-500">{key.key}</p>
              </div>
              <button
                onClick={() => deleteApiKey(key.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
