'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { ThumbsUp, Eye, Bell, MessageCircle, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

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

  const renderStats = (data) => {
    const stats = [
      { name: 'Total Likes', value: data.totalLikes, icon: ThumbsUp, color: 'bg-blue-500' },
      { name: 'Total Views', value: data.totalViews, icon: Eye, color: 'bg-green-500' },
      { name: 'Total Notifications', value: data.totalNotifications, icon: Bell, color: 'bg-yellow-500' },
      { name: 'Total Messages', value: data.totalMessage, icon: MessageCircle, color: 'bg-purple-500' },
      { name: 'Private Chats', value: data.privateChats, icon: MessageSquare, color: 'bg-pink-500' },
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
      <h1 className="text-3xl font-bold text-gray-900">Engagement Metrics</h1>
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="allTime">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <h2 className="text-2xl font-semibold mb-4">Daily Engagement Metrics</h2>
          {renderStats(engagementData.daily)}
        </TabsContent>
        <TabsContent value="monthly">
          <h2 className="text-2xl font-semibold mb-4">Monthly Engagement Metrics</h2>
          {renderStats(engagementData.monthly)}
        </TabsContent>
        <TabsContent value="allTime">
          <h2 className="text-2xl font-semibold mb-4">All Time Engagement Metrics</h2>
          {renderStats(engagementData.allTime)}
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Engagement Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Daily Engagement</h3>
              <p className="text-2xl font-bold">{engagementData.daily.totalViews} views</p>
              <p className="text-sm text-gray-500">{engagementData.daily.totalLikes} likes</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Monthly Engagement</h3>
              <p className="text-2xl font-bold">{engagementData.monthly.totalViews} views</p>
              <p className="text-sm text-gray-500">{engagementData.monthly.totalLikes} likes</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">All Time Engagement</h3>
              <p className="text-2xl font-bold">{engagementData.allTime.totalViews} views</p>
              <p className="text-sm text-gray-500">{engagementData.allTime.totalLikes} likes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}