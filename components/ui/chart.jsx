"use client"

import * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ChartContainer({ config, className, children, ...props }) {
  return (
    <div
      className={className}
      style={
        {
          "--color-total": config.total?.color,
          "--color-active": config.active?.color,
          ...Object.fromEntries(
            Object.entries(config).map(([key, value]) => [
              `--color-${key}`,
              value.color,
            ])
          ),
        }
      }
      {...props}
    >
      {children}
    </div>
  )
}

export function ChartTooltip({ indicator = "dashed", ...props }) {
  return (
    <Tooltip {...props}>
      <TooltipProvider>
        <TooltipTrigger asChild>
          {indicator === "dashed" ? (
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              strokeDasharray="4 4"
              strokeWidth={1}
              stroke="currentColor"
            />
          ) : (
            <line
              x1="0"
              x2="0"
              y1="0"
              y2="100%"
              strokeWidth={1}
              stroke="currentColor"
            />
          )}
        </TooltipTrigger>
        <TooltipContent>{props.children}</TooltipContent>
      </TooltipProvider>
    </Tooltip>
  )
}

export function ChartTooltipContent({ indicator = "dashed", nameKey = "name", hideLabel = false }) {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-background p-2 shadow-md">
      {!hideLabel && (
        <div className="flex items-center gap-2">
          <div className="h-1 w-4 rounded-sm bg-foreground" />
          <span className="text-xs text-muted-foreground">
            {nameKey}
          </span>
        </div>
      )}
      {Object.entries(payload[0].payload)
        .filter(([key]) => key !== nameKey)
        .map(([key, value]) => (
          <div key={key} className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium">{key}</span>
            <span className="text-sm text-muted-foreground">{value}</span>
          </div>
        ))}
    </div>
  )
}