"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { Button } from "@/app/components/ui/button"
import { FiBell, FiClock, FiPause, FiPlay, FiRefreshCw } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { FocusChart } from "@/app/components/pomodoro/focus-chart"

export default function Pomodoro() {
    const timer = {
        Type: {
          Focus: "Focus",
          ShortBreak: "ShortBreak",
          LongBreak: "LongBreak",
        },
        Duration: {
          Focus: 3,
          ShortBreak: 300,
          LongBreak: 900,
        }
      };
    const [timeRemaining, setTimeRemaining] = useState(timer.Duration.Focus)
    const [isRunning, setIsRunning] = useState(false)
    const [selectedTab, setSelectedTab] = useState("focus")
    const [timerRunningAudio, setTimerRunningAudio] = useState<HTMLAudioElement>();
    const [timerFinishedAudio, setTimerFinishedAudio] = useState<HTMLAudioElement>();

    useEffect(() => {
        let interval: any
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1)
            }, 1000)
        } else if (timeRemaining === 0) {
            setIsRunning(false)
            timerRunningAudio?.pause()
            timerFinishedAudio?.play()
        }
        return () => clearInterval(interval)
    }, [isRunning, timeRemaining, timerFinishedAudio, timerRunningAudio])

    const handleStart = () => {
        setIsRunning(true)
        timerFinishedAudio?.pause()
        timerRunningAudio?.play()
    }
    const handlePause = () => {
        setIsRunning(false)
        timerRunningAudio?.pause()
        timerFinishedAudio?.pause()
    }
    const handleReset = () => {
        if (selectedTab == "focus") {
            setTimeRemaining(timer.Duration.Focus)
        } else if (selectedTab == "shortbreak") {
            setTimeRemaining(timer.Duration.ShortBreak)
        } else if (selectedTab == "longbreak") {
            setTimeRemaining(timer.Duration.LongBreak)
        }
        setIsRunning(false)
        timerRunningAudio?.pause()
        timerFinishedAudio?.pause()
    }

    function selectTab(tab: string) {
        if (tab == "focus") {
            setTimeRemaining(timer.Duration.Focus)
        } else if (tab == "shortbreak") {
            setTimeRemaining(timer.Duration.ShortBreak)
        } else if (tab == "longbreak") {
            setTimeRemaining(timer.Duration.LongBreak)
        }
        setSelectedTab(tab)
    }

    const timerRunningAudioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined"
          ? new Audio("\\audio\\ticking-slow.mp3")
          : undefined
      );
    
      const timerFinishedAudioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined"
          ? new Audio("\\audio\\timer-finished.mp3")
          : undefined
      );
    
      useMemo(() => {
        if (timerRunningAudioRef && timerRunningAudioRef.current) {
          timerRunningAudioRef.current.loop = true;
          setTimerRunningAudio(timerRunningAudioRef.current);
        }
      }, [timerRunningAudioRef]);
    
      useMemo(() => {
        if (timerFinishedAudioRef && timerFinishedAudioRef.current) {
          timerFinishedAudioRef.current.loop = false;
          setTimerFinishedAudio(timerFinishedAudioRef.current);
        }
      }, [timerFinishedAudioRef]);

      
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
                                <CardTitle className="flex items-center justify-start gap-2"><FiClock /> Focus</CardTitle>
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
                            <CardTitle className="flex items-center justify-start gap-2"><FiBell /> Short Break</CardTitle>
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
                            <CardTitle className="flex items-center justify-start gap-2"><FiBell /> Long Break</CardTitle>
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