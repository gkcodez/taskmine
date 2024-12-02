"use client"

import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { FiPause, FiPlay, FiRefreshCw } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { FocusChart } from "@/app/components/pomodoro/focus-chart"

export default function Pomodoro() {
    const timerData = {
        focus: 1200,
        shortbreak: 300,
        longbreak: 900
    }
    const [timeRemaining, setTimeRemaining] = useState(timerData.focus)
    const [isRunning, setIsRunning] = useState(false)
    const [selectedTab, setSelectedTab] = useState("focus")




    useEffect(() => {
        let interval: any
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1)
            }, 1000)
        } else if (timeRemaining === 0) {
            setIsRunning(false)
        }
        return () => clearInterval(interval)
    }, [isRunning, timeRemaining])

    const handleStart = () => {
        setIsRunning(true)
    }
    const handlePause = () => {
        setIsRunning(false)
    }
    const handleReset = () => {
        if (selectedTab == "focus") {
            setTimeRemaining(timerData.focus)
        } else if (selectedTab == "shortbreak") {
            setTimeRemaining(timerData.shortbreak)
        } else if (selectedTab == "longbreak") {
            setTimeRemaining(timerData.longbreak)
        }
        setIsRunning(false)
    }

    function selectTab(tab: string) {
        if (tab == "focus") {
            setTimeRemaining(timerData.focus)
        } else if (tab == "shortbreak") {
            setTimeRemaining(timerData.shortbreak)
        } else if (tab == "longbreak") {
            setTimeRemaining(timerData.longbreak)
        }
        setSelectedTab(tab)
    }
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <div className="flex flex-col items-start justify-start gap-2 w-full">
                <Tabs defaultValue="focus" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger disabled={isRunning} value="focus" onClick={() => selectTab("focus")}>Focus</TabsTrigger>
                        <TabsTrigger disabled={isRunning} value="shortbreak" onClick={() => selectTab("shortbreak")}>Short Break</TabsTrigger>
                        <TabsTrigger disabled={isRunning} value="longbreak" onClick={() => selectTab("longbreak")}>Long Break</TabsTrigger>
                    </TabsList>
                    <TabsContent value="focus">
                        <Card>
                            <CardHeader>
                                <CardTitle>Focus</CardTitle>
                                <CardDescription>
                                    Focus on one task at a time.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
                                    {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                </div>

                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4">
                                    <Button onClick={handleStart} disabled={isRunning}>
                                        <FiPlay /> Start
                                    </Button>
                                    <Button onClick={handlePause} disabled={!isRunning}>
                                        <FiPause /> Pause
                                    </Button>
                                    <Button onClick={handleReset}>
                                        <FiRefreshCw /> Reset</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="shortbreak">
                        <Card>
                            <CardHeader>
                                <CardTitle>Short Break</CardTitle>
                                <CardDescription>
                                    Time to take a short break.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
                                    {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                </div>

                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4">
                                    <Button onClick={handleStart} disabled={isRunning}>
                                        <FiPlay /> Start
                                    </Button>
                                    <Button onClick={handlePause} disabled={!isRunning}>
                                        <FiPause /> Pause
                                    </Button>
                                    <Button onClick={handleReset}>
                                        <FiRefreshCw /> Reset</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="longbreak">
                        <Card>
                            <CardHeader>
                                <CardTitle>Long Break</CardTitle>
                                <CardDescription>
                                    Time to relax!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
                                    {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="flex gap-4">
                                    <Button onClick={handleStart} disabled={isRunning}>
                                        <FiPlay /> Start
                                    </Button>
                                    <Button onClick={handlePause} disabled={!isRunning}>
                                        <FiPause /> Pause
                                    </Button>
                                    <Button onClick={handleReset}>
                                        <FiRefreshCw /> Reset</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="w-full">
                    <FocusChart />
                </div>

                {/* <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-start gap-2"><FiTarget/> Focus</CardTitle>
                        <CardDescription>Focus statistics</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <p>Focus Time (Today): 23 minutes</p>
                        <p>Focus Time (Yesterday): 23 minutes</p>
                        <p>Focus Time (This Week): 23 minutes</p>
                        <p>Focus Time (Overall): 658 minutes</p>
                    </CardContent>
                    <CardFooter>
                    </CardFooter>
                </Card> */}
            </div>
        </div>
    )
}