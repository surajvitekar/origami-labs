'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Log {
  id: string
  agent_id: string
  event_type: string
  message: string
  metadata: Record<string, any>
  created_at: string
}

export default function LogsSection() {
  const [logs, setLogs] = useState<Log[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLogs()
    // Set up real-time subscription
    const subscription = supabase
      .channel('logs')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'logs' 
      }, (payload) => {
        setLogs(current => [payload.new as Log, ...current].slice(0, 100))
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadLogs() {
    try {
      const { data, error } = await supabase
        .from('logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error loading logs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">System Logs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-3 border rounded text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{log.event_type}</span>
                <span className="text-gray-500">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{log.message}</p>
              {Object.keys(log.metadata).length > 0 && (
                <pre className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs overflow-x-auto">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
