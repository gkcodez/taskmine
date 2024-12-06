"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Button } from "@/app/components/ui/button"
import { FiBell, FiClock, FiPause, FiPlay, FiRefreshCw } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card"
import { FocusChart } from "@/app/components/pomodoro/focus-chart"
import { ITask } from "@/app/models/task"

export default function Pomodoro({ task, onTaskFocusComplete }: { task: ITask | undefined, onTaskFocusComplete: any }) {
    const timer = {
        Type: {
            Focus: "Focus",
            ShortBreak: "ShortBreak",
            LongBreak: "LongBreak",
        },
        Duration: {
            Focus: 1200,
            ShortBreak: 300,
            LongBreak: 900,
        }
    };
    const [timeRemaining, setTimeRemaining] = useState(timer.Duration.Focus)
    const [isRunning, setIsRunning] = useState(false)
    const [selectedTab, setSelectedTab] = useState("focus")
    const [timerRunningAudio, setTimerRunningAudio] = useState<HTMLAudioElement>();
    const [timerFinishedAudio, setTimerFinishedAudio] = useState<HTMLAudioElement>();

    const onTabChange = (tab: any) => {
        selectTab(tab)
    }

    const selectTab = useCallback((tab: string) => {
        if (tab == "focus") {
            setTimeRemaining(timer.Duration.Focus)
        } else if (tab == "shortbreak") {
            setTimeRemaining(timer.Duration.ShortBreak)
        } else if (tab == "longbreak") {
            setTimeRemaining(timer.Duration.LongBreak)
        }
        setSelectedTab(tab)
    }, [timer.Duration.Focus, timer.Duration.LongBreak, timer.Duration.ShortBreak])


    useEffect(() => {
        let interval: any
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1)
            }, 1000)
        } else if (timeRemaining === 0) {
            setIsRunning(false)
            if (selectedTab == "focus") {
                selectTab("shortbreak")
            }
            else if (selectedTab == "shortbreak") {
                selectTab("longbreak")
            } else {
                selectTab("focus")
            }

            timerRunningAudio?.pause()
            timerFinishedAudio?.play()
            onTaskFocusComplete(task);
        }
        return () => clearInterval(interval)
    }, [isRunning, onTaskFocusComplete, selectTab, selectedTab, task, timeRemaining, timer.Duration.Focus, timer.Duration.ShortBreak, timerFinishedAudio, timerRunningAudio])


    useEffect(() => {
        selectTab("focus")
    }, [task])

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
        <div className="flex flex-col items-start justify-start w-full min-h-[calc(100vh-80px)] gap-2">
            <Tabs defaultValue="focus" value={selectedTab} onValueChange={onTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger disabled={isRunning || !task} value="focus" onClick={() => selectTab("focus")}>Focus</TabsTrigger>
                    <TabsTrigger disabled={isRunning || !task} value="shortbreak" onClick={() => selectTab("shortbreak")}>Short Break</TabsTrigger>
                    <TabsTrigger disabled={isRunning || !task} value="longbreak" onClick={() => selectTab("longbreak")}>Long Break</TabsTrigger>
                </TabsList>
                <TabsContent value="focus" className="h-full">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-start gap-2"><FiClock /> Focus</CardTitle>
                            <CardDescription>
                                {task?.title ?? "Select a task to focus on!"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="text-8xl font-bold text-gray-900 dark:text-gray-50">
                                {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                            </div>

                        </CardContent>
                        <CardFooter>
                            <div className="flex gap-4">
                                {!isRunning &&
                                    <Button onClick={handleStart} disabled={!task}>
                                        <FiPlay /> Start
                                    </Button>
                                }
                                {
                                    isRunning && <Button onClick={handlePause}>
                                        <FiPause /> Pause
                                    </Button>
                                }

                                <Button onClick={handleReset}>
                                    <FiRefreshCw /> Reset
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="shortbreak" className="h-full">
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
                                {!isRunning &&
                                    <Button onClick={handleStart}>
                                        <FiPlay /> Start
                                    </Button>
                                }
                                {
                                    isRunning && <Button onClick={handlePause}>
                                        <FiPause /> Pause
                                    </Button>
                                }

                                <Button onClick={handleReset}>
                                    <FiRefreshCw /> Reset
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="longbreak" className="h-full">
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
                                {!isRunning &&
                                    <Button onClick={handleStart}>
                                        <FiPlay /> Start
                                    </Button>
                                }
                                {
                                    isRunning && <Button onClick={handlePause}>
                                        <FiPause /> Pause
                                    </Button>
                                }

                                <Button onClick={handleReset}>
                                    <FiRefreshCw /> Reset
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            <div className="w-full">
                <FocusChart />
            </div>
        </div>
    )
}