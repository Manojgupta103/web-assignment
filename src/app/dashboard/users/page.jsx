'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { Users, UserPlus, UserCheck, Crown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsersPage() {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await fetchDashboardData()
        setUserData(data.userMetrics)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!userData) return <div className="text-center">No user data available</div>

  const renderStats = (data) => {
    const stats = [
      { name: 'Total Users', value: data.totalUser, icon: Users, color: 'bg-blue-500' },
      { name: 'Active Users', value: data.activeUser, icon: UserCheck, color: 'bg-green-500' },
      { name: 'Total Referrals', value: data.totalReferral, icon: UserPlus, color: 'bg-yellow-500' },
      { name: 'Creators', value: data.creator, icon: Crown, color: 'bg-purple-500' },
    ]

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="allTime">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <h2 className="text-2xl font-semibold mb-4">Daily User Metrics</h2>
          {renderStats(userData.daily)}
        </TabsContent>
        <TabsContent value="monthly">
          <h2 className="text-2xl font-semibold mb-4">Monthly User Metrics</h2>
          {renderStats(userData.monthly)}
        </TabsContent>
        <TabsContent value="allTime">
          <h2 className="text-2xl font-semibold mb-4">All Time User Metrics</h2>
          {renderStats(userData.allTime)}
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>User Growth Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Daily Growth</h3>
              <p className="text-2xl font-bold">{userData.daily.totalUser} new users</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Monthly Growth</h3>
              <p className="text-2xl font-bold">{userData.monthly.totalUser} new users</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">All Time Users</h3>
              <p className="text-2xl font-bold">{userData.allTime.totalUser} users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}