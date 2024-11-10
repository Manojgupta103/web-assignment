'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { FileText, Eye, MessageSquare, Share2, Ban, Trash } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

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
  if (!contentData) return <div className="text-center">No content data available</div>

  const renderStats = (data) => {
    const stats = [
      { name: 'Total Posts', value: data.totalPosts, icon: FileText, color: 'bg-blue-500' },
      { name: 'Total Views', value: data.totalViews, icon: Eye, color: 'bg-green-500' },
      { name: 'Total Comments', value: data.totalComments, icon: MessageSquare, color: 'bg-yellow-500' },
      { name: 'Total Shares', value: data.totalPostShares, icon: Share2, color: 'bg-purple-500' },
      { name: 'Posts Blocked', value: data.totalPostBlocked, icon: Ban, color: 'bg-red-500' },
      { name: 'Posts Deleted', value: data.totalPostDeleted, icon: Trash, color: 'bg-gray-500' },
    ]

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="allTime">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <h2 className="text-2xl font-semibold mb-4">Daily Content Metrics</h2>
          {renderStats(contentData.daily)}
        </TabsContent>
        <TabsContent value="monthly">
          <h2 className="text-2xl font-semibold mb-4">Monthly Content Metrics</h2>
          {renderStats(contentData.monthly)}
        </TabsContent>
        <TabsContent value="allTime">
          <h2 className="text-2xl font-semibold mb-4">All Time Content Metrics</h2>
          {renderStats(contentData.allTime)}
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Content Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Daily Engagement</h3>
              <p className="text-2xl font-bold">{contentData.daily.totalViews} views</p>
              <p className="text-sm text-gray-500">{contentData.daily.totalComments} comments</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Monthly Engagement</h3>
              <p className="text-2xl font-bold">{contentData.monthly.totalViews} views</p>
              <p className="text-sm text-gray-500">{contentData.monthly.totalComments} comments</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">All Time Engagement</h3>
              <p className="text-2xl font-bold">{contentData.allTime.totalViews} views</p>
              <p className="text-sm text-gray-500">{contentData.allTime.totalComments} comments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}