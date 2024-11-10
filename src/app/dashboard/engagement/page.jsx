'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { ThumbsUp, Eye, MessageCircle, MessageSquare, Share2, Clock } from 'lucide-react'

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
  if (!engagementData) return <div className="text-center">No engagement data available</div>

  const stats = [
    { name: 'Total Likes', value: engagementData.daily?.totalLikes ?? 0, icon: ThumbsUp, color: 'bg-blue-500' },
    { name: 'Total Views', value: engagementData.daily?.totalViews ?? 0, icon: Eye, color: 'bg-green-500' },
    { name: 'Total Messages', value: engagementData.daily?.totalMessage ?? 0, icon: MessageCircle, color: 'bg-yellow-500' },
    { name: 'Private Chats', value: engagementData.daily?.privateChats ?? 0, icon: MessageSquare, color: 'bg-purple-500' },
    { name: 'Total Shares', value: engagementData.daily?.totalShares ?? 0, icon: Share2, color: 'bg-pink-500' },
    { name: 'Avg. Time on App', value: `${(engagementData.daily?.avgTimeOnApp ?? 0).toFixed(2)}m`, icon: Clock, color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Engagement Metrics</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Daily Active Users</h3>
              <p className="text-3xl font-bold text-blue-600">{engagementData.daily?.activeUsers ?? 0}</p>
              <p className="text-sm text-gray-500">vs. {engagementData.weekly?.activeUsers ?? 0} weekly average</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Engagement Rate</h3>
              <p className="text-3xl font-bold text-green-600">{((engagementData.daily?.engagementRate ?? 0) * 100).toFixed(2)}%</p>
              <p className="text-sm text-gray-500">Interactions / Total Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}