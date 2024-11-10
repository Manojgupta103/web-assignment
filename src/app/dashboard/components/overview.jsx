'use client'

import { useState, useEffect } from 'react'

import { fetchDashboardData } from '@/lib/api'
import UserStats from './user-stats'
import ContentStats from './content-stats'
import EngagementStats from './engagement-stats'
import BlockchainStats from './blockchain-stats'

export default function Overview() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!dashboardData) return null

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <UserStats data={dashboardData.userMetrics} />
      <ContentStats data={dashboardData.contentMetrics} />
      <EngagementStats data={dashboardData.engagementMetrics} />
      <BlockchainStats data={dashboardData.blockchainMetrics} />
    </div>
  )
}