'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { FileText, Eye, MessageSquare, Share2 } from 'lucide-react'

export default function ContentPage() {
  const [contentData, setContentData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadContentData() {
      try {
        const data = await fetchDashboardData()
        setContentData(data.contentMetrics)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadContentData()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!contentData) return null

  const stats = [
    { name: 'Total Posts', value: contentData.daily.totalPosts, icon: FileText, color: 'bg-blue-500' },
    { name: 'Total Views', value: contentData.daily.totalViews, icon: Eye, color: 'bg-green-500' },
    { name: 'Total Comments', value: contentData.daily.totalComments, icon: MessageSquare, color: 'bg-yellow-500' },
    { name: 'Total Shares', value: contentData.daily.totalPostShares, icon: Share2, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Posts</h2>
        {/* Add a recent posts component here */}
      </div>
    </div>
  )
}