'use client'

import { useState, useEffect } from 'react'
import { fetchDashboardData } from '@/lib/api'

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
  if (!userData) return null

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {userData.daily.totalUser}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Users
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {userData.daily.activeUser}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Referrals
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {userData.daily.totalReferral}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
          <div className="p-4 flex items-center">
            <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Creators
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {userData.daily.creator}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-600">Here you can manage user accounts, view user activity, and monitor user growth.</p>
    </div>
  )
}