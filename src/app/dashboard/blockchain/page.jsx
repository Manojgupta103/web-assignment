'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { Coins, Wallet } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"

export default function BlockchainPage() {
  const [blockchainData, setBlockchainData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadBlockchainData() {
      try {
        const data = await fetchDashboardData()
        setBlockchainData(data.blockchainMetrics)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    loadBlockchainData()
  }, [])

  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>
  if (!blockchainData) return <div className="text-center">No blockchain data available</div>

  const renderStats = (data) => {
    const stats = [
      { name: 'Total Tokens', value: data.totalTokens, icon: Coins, color: 'bg-blue-500' },
      { name: 'Solana Wallets', value: data.totalWalletOnSolana, icon: Wallet, color: 'bg-green-500' },
      { name: 'Polygon Wallets', value: data.totalWalletOnPolygon, icon: Wallet, color: 'bg-yellow-500' },
      { name: 'Ethereum Wallets', value: data.totalWalletOnEthereum, icon: Wallet, color: 'bg-purple-500' },
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
      <h1 className="text-3xl font-bold text-gray-900">Blockchain Metrics</h1>
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="allTime">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="daily">
          <h2 className="text-2xl font-semibold mb-4">Daily Blockchain Metrics</h2>
          {renderStats(blockchainData.daily)}
        </TabsContent>
        <TabsContent value="monthly">
          <h2 className="text-2xl font-semibold mb-4">Monthly Blockchain Metrics</h2>
          {renderStats(blockchainData.monthly)}
        </TabsContent>
        <TabsContent value="allTime">
          <h2 className="text-2xl font-semibold mb-4">All Time Blockchain Metrics</h2>
          {renderStats(blockchainData.allTime)}
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Activity Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium">Daily Tokens</h3>
              <p className="text-2xl font-bold">{blockchainData.daily.totalTokens}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Monthly Tokens</h3>
              <p className="text-2xl font-bold">{blockchainData.monthly.totalTokens}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium">All Time Tokens</h3>
              <p className="text-2xl font-bold">{blockchainData.allTime.totalTokens}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}