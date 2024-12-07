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
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchPomodorosForLast7Days } from "@/app/actions/pomodoro/pomodoro"
import { useEffect, useState } from "react"


let chartData = [{}]

const chartConfig = {
  focus: {
    label: "Focus",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PomodoroChart() {


  const fetchPomodoroHistory = async () => {
    const pomodoroHistory = await fetchPomodorosForLast7Days();
    if (pomodoroHistory) {
      chartData = pomodoroHistory;
    }
  }


  useEffect(() => {
    fetchPomodoroHistory();
  }, []);


  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-center w-full">
        <CardTitle>Pomodoro Chart</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        {
          chartData &&
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
        }

      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Increased by 5.2% today <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing pomodoros for the last 7 days
        </div>
      </CardFooter>
    </Card>
  )
}
