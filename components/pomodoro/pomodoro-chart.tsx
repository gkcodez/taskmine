"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
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


let chartData = [
  {
    focus: 0,
    date: null
  }
]

const chartConfig = {
  focus: {
    label: "Focus",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

let focusChangePercentage = 0

export function PomodoroChart() {


  const fetchPomodoroHistory = async () => {
    const pomodoroHistory = await fetchPomodorosForLast7Days();
    if (pomodoroHistory) {
      chartData = pomodoroHistory;
      console.log(chartData)
      const today = chartData[chartData.length - 1]; // Latest day (today)
      const yesterday = chartData[chartData.length - 2]; // Previous day
      const focusChange = (today.focus - yesterday.focus) / (yesterday.focus != 0 ? yesterday.focus : 1)
      console.log(focusChange)
      focusChangePercentage = focusChange * 100;
      console.log(focusChangePercentage)
    }
  }


  useEffect(() => {
    fetchPomodoroHistory();
  }, []);


  return (
    <Card className="flex flex-col items-start justify-start w-full h-full">
      <CardHeader className="flex items-start justify-center w-full">
        <CardTitle>Pomodoro Chart</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
        {chartData && (
          <ChartContainer config={chartConfig} className="h-full w-full max-w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              width={undefined} // Allow it to use the parent's width
              className="w-full max-w-full h-full"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval={0} // Show all ticks
                tickFormatter={(date: string) => {
                  const formattedDate = new Date(date);

                  // Check if the date is valid (not NaN)
                  if (isNaN(formattedDate.getTime())) {
                    return ''; // Return empty string if date is invalid
                  }

                  const day = String(formattedDate.getDate()).padStart(2, '0');
                  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
                  return `${day}/${month}`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="focus" fill="var(--color-focus)" radius={5} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {
            focusChangePercentage == 0 &&
            <div className="flex items-center justify-start gap-2 flex-wrap">
              Changed by <span className="text-gray-600">{focusChangePercentage.toFixed(2)}%</span> today <TrendingUp className="h-4 w-4 text-gray-600" />
            </div>
          }
          {
            focusChangePercentage > 0 &&
            <div className="flex items-center justify-start gap-2 flex-wrap">
              Increased by <span className="text-green-600">{focusChangePercentage.toFixed(2)}%</span> today <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          }
          {
            focusChangePercentage < 0 &&
            <div className="flex items-center justify-start gap-2 flex-wrap">
              Decreased by <span className="text-red-600">{focusChangePercentage.toFixed(2)}%</span> today <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
          }
        </div>
      </CardFooter>
    </Card>
  )
}
