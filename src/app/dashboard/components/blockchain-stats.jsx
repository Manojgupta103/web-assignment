import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"

export function BlockchainStats({ data }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.daily.totalTokens}</div>
          <p className="text-xs text-muted-foreground">
            +{data.daily.totalTokens - data.monthly.totalTokens} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Solana Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.daily.totalWalletOnSolana}</div>
          <p className="text-xs text-muted-foreground">
            +{data.daily.totalWalletOnSolana - data.monthly.totalWalletOnSolana} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Polygon Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.daily.totalWalletOnPolygon}</div>
          <p className="text-xs text-muted-foreground">
            +{data.daily.totalWalletOnPolygon - data.monthly.totalWalletOnPolygon} from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ethereum Wallets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.daily.totalWalletOnEthereum}</div>
          <p className="text-xs text-muted-foreground">
            +{data.daily.totalWalletOnEthereum - data.monthly.totalWalletOnEthereum} from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}