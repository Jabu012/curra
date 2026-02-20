import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"

const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
  }
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within ChartContainer")
  }
  return context
}

/* -------------------------------- */
/* Chart Container */
/* -------------------------------- */

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactNode
  }
>(({ className, config, children, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

/* -------------------------------- */
/* Tooltip */
/* -------------------------------- */

export const ChartTooltip = RechartsPrimitive.Tooltip

type TooltipItem = {
  dataKey?: string
  name?: string
  value?: number
  color?: string
}

type SafeTooltipProps = {
  active?: boolean
  payload?: TooltipItem[]
  label?: string | number
  hideLabel?: boolean
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  SafeTooltipProps
>((props, ref) => {
  const { active, payload, label, hideLabel } = props
  const { config } = useChart()

  if (!active || !Array.isArray(payload) || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className="rounded-lg border bg-background px-3 py-2 text-xs shadow-md"
    >
      {!hideLabel && label && (
        <div className="mb-1 font-medium">{String(label)}</div>
      )}

      {payload.map((item, index) => {
        const key = item.dataKey ?? "value"
        const itemConfig = config[key]

        return (
          <div
            key={`${key}-${index}`}
            className="flex justify-between gap-4"
          >
            <span className="text-muted-foreground">
              {itemConfig?.label ?? item.name}
            </span>
            <span className="font-mono">
              {Number(item.value ?? 0).toLocaleString()}
            </span>
          </div>
        )
      })}
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

/* -------------------------------- */
/* Legend */
/* -------------------------------- */

export const ChartLegend = RechartsPrimitive.Legend

type LegendItem = {
  dataKey?: string
  value?: string
  color?: string
}

type SafeLegendProps = {
  payload?: LegendItem[]
  hideIcon?: boolean
}

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  SafeLegendProps
>((props, ref) => {
  const { payload, hideIcon } = props
  const { config } = useChart()

  if (!Array.isArray(payload) || payload.length === 0) {
    return null
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-4 pt-3"
    >
      {payload.map((item, index) => {
        const key = item.dataKey ?? "value"
        const itemConfig = config[key]

        return (
          <div
            key={`${key}-${index}`}
            className="flex items-center gap-2"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label ?? item.value}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegendContent"