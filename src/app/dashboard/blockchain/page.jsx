'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchDashboardData } from '@/lib/api'
import { Coins, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react'

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

  const stats = [
    { name: 'Total Tokens', value: blockchainData.daily?.totalTokens ?? 0, icon: Coins, color: 'bg-blue-500' },
    { name: 'Solana Wallets', value: blockchainData.daily?.totalWalletOnSolana ?? 0, icon: Wallet, color: 'bg-green-500' },
    { name: 'Polygon Wallets', value: blockchainData.daily?.totalWalletOnPolygon ?? 0, icon: Wallet, color: 'bg-yellow-500' },
    { name: 'Ethereum Wallets', value: blockchainData.daily?.totalWalletOnEthereum ?? 0, icon: Wallet, color: 'bg-purple-500' },
    { name: 'New Wallets', value: blockchainData.daily?.newWallets ?? 0, icon: TrendingUp, color: 'bg-pink-500' },
    { name: 'Token Price', value: `$${(blockchainData.daily?.tokenPrice ?? 0).toFixed(2)}`, icon: DollarSign, color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Blockchain Metrics</h1>
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Token Distribution</h2>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">24h Token Volume</h3>
              <p className="text-3xl font-bold text-blue-600">{(blockchainData.daily?.tokenVolume ?? 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500 flex items-center">
                {(blockchainData.daily?.tokenVolumeChange ?? 0) >= 0 ? (
                  <ArrowUpRight className="text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="text-red-500 mr-1" />
                )}
                {Math.abs(blockchainData.daily?.tokenVolumeChange ?? 0).toFixed(2)}% from yesterday
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Active Wallets</h3>
              <p className="text-3xl font-bold text-green-600">{(blockchainData.daily?.activeWallets ?? 0).toLocaleString()}</p>
              <p className="text-sm text-gray-500">Across all supported chains</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}