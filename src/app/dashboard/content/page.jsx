import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/../components/ui/card"

export function ContentPage({ data }) {
  return (
    <div className="space-y-4">
              <h1 className="text-3xl font-bold">Content</h1>
      <h2 className="text-2xl font-semibold">Content Statistics</h2>
      <p className="text-lg text-gray-600">This page will display content management features.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalPosts - data.monthly.totalPosts} from last month
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
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalComments - data.monthly.totalComments} from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.daily.totalPostShares}</div>
            <p className="text-xs text-muted-foreground">
              +{data.daily.totalPostShares - data.monthly.totalPostShares} from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}