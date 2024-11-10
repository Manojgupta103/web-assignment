'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { ThumbsUp, Eye, MessageCircle, MessageSquare } from 'lucide-react'

export default function EngagementPage() {
  const [engagementData, setEngagementData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadEngagementData() {
      try {
        const data = await fetchDashboardData()
        setEngagementData(data.engagementMetrics)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadEngagementData()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!engagementData) return null

  const stats = [
    { name: 'Total Likes', value: engagementData.daily.totalLikes, icon: ThumbsUp, color: 'bg-blue-500' },
    { name: 'Total Views', value: engagementData.daily.totalViews, icon: Eye, color: 'bg-green-500' },
    { name: 'Total Messages', value: engagementData.daily.totalMessage, icon: MessageCircle, color: 'bg-yellow-500' },
    { name: 'Private Chats', value: engagementData.daily.privateChats, icon: MessageSquare, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Engagement Metrics</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`${item.color} overflow-hidden rounded-lg shadow`}>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 rounded-md p-3 text-white">
                    <item.icon size={24} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="truncate text-sm font-medium text-gray-100">{item.name}</dt>
                      <dd className="text-3xl font-semibold text-white">{item.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Engagement Trends</h2>
        {/* Add an engagement trends chart component here */}
      </div>
    </div>
  )
}