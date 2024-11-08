"use client"

import React, { useState, useEffect } from 'react'
import { UserStats } from './components/user-stats'
import { ContentStats } from './components/content-stats'
import { EngagementStats } from './components/engagement-stats'
import { BlockchainStats } from './components/blockchain-stats'
// import { DashboardNav } from './components/dashboard-nav'
import { fetchDashboardData } from '../../../lib/api'

export default function DashboardPage() {
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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!dashboardData) return null

  return (
    <div key="dashboard">
      <DashboardNav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6">
          <UserStats data={dashboardData.userMetrics} />
          <ContentStats data={dashboardData.contentMetrics} />
          <EngagementStats data={dashboardData.engagementMetrics} />
          <BlockchainStats data={dashboardData.blockchainMetrics} />
        </div>
      </div>
    </div>
  )
}