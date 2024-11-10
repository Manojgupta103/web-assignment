'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { Users, UserPlus, UserCheck, Crown, Clock, TrendingUp } from 'lucide-react'

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

  const stats = [
    { name: 'Total Users', value: userData.daily?.totalUser ?? 0, icon: Users, color: 'bg-blue-500' },
    { name: 'Active Users', value: userData.daily?.activeUser ?? 0, icon: UserCheck, color: 'bg-green-500' },
    { name: 'Total Referrals', value: userData.daily?.totalReferral ?? 0, icon: UserPlus, color: 'bg-yellow-500' },
    { name: 'Creators', value: userData.daily?.creator ?? 0, icon: Crown, color: 'bg-purple-500' },
    { name: 'New Users', value: userData.daily?.newUser ?? 0, icon: TrendingUp, color: 'bg-pink-500' },
    { name: 'Avg. Session Duration', value: `${(userData.daily?.avgSessionDuration ?? 0).toFixed(2)}s`, icon: Clock, color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Activity</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Daily Active Users</h3>
              <p className="text-3xl font-bold text-blue-600">{userData.daily?.activeUser ?? 0}</p>
              <p className="text-sm text-gray-500">vs. {userData.weekly?.activeUser ?? 0} weekly</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">User Retention Rate</h3>
              <p className="text-3xl font-bold text-green-600">{((userData.daily?.retentionRate ?? 0) * 100).toFixed(2)}%</p>
              <p className="text-sm text-gray-500">Daily retention rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}