"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"
const chartData = [
  { month: "01", focus: 186 },
  { month: "02", focus: 305 },
  { month: "03", focus: 237 },
  { month: "04", focus: 73 },
  { month: "05", focus: 209 },
  { month: "06", focus: 209 },
  { month: "07", focus: 209 },
]

const chartConfig = {
  focus: {
    label: "Focus",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function FocusChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Focus Hours</CardTitle>
        <CardDescription>01/12/2024 - 07/12/2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="focus" fill="var(--color-focus)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Increased by 5.2% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing focus hours for the last 7 days
        </div>
      </CardFooter>
    </Card>
  )
}
