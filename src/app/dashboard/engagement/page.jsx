import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/../components/ui/card"

export function EngagementPage({ data }) {
  return (
    <div className="space-y-4">
        <h1 className="text-3xl font-bold">Engagement</h1>
      <h2 className="text-2xl font-semibold">Engagement Statistics</h2>
      <p className="text-lg text-gray-600">This page will display engagement metrics and features.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalLikes}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalLikes - data.monthly.totalLikes} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalViews}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalViews - data.monthly.totalViews} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalMessage}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalMessage - data.monthly.totalMessage} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Private Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.privateChats}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.privateChats - data.monthly.privateChats} from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}