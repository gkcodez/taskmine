"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FiBell, FiClock, FiPause, FiPlay, FiRefreshCw, FiSkipForward } from "react-icons/fi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { PomodoroChart } from "@/components/pomodoro/pomodoro-chart"
import { ITask } from "@/models/task"
import Image from "next/image"

export default function Pomodoro({ task, onTaskFocusComplete }: { task: ITask | undefined, onTaskFocusComplete: any }) {
    const timer = {
        Type: {
            Focus: "Focus",
            ShortBreak: "ShortBreak",
            LongBreak: "LongBreak",
        },
        Duration: {
            Focus: 1500,
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
            timerRunningAudio?.pause()
            timerFinishedAudio?.play()
            if (selectedTab == "focus") {
                onTaskFocusComplete(task);
                selectTab("shortbreak")
            }
            else {
                selectTab("focus")
            }
        }
        return () => clearInterval(interval)
    }, [isRunning, onTaskFocusComplete, selectTab, selectedTab, task, timeRemaining, timer.Duration.Focus, timer.Duration.ShortBreak, timerFinishedAudio, timerRunningAudio])


    useEffect(() => {
        selectTab("focus")
    }, [selectTab, task])

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
        setIsRunning(false)
        timerRunningAudio?.pause()
        timerFinishedAudio?.pause()
        if (selectedTab == "focus") {
            setTimeRemaining(timer.Duration.Focus)
        } else if (selectedTab == "shortbreak") {
            setTimeRemaining(timer.Duration.ShortBreak)
        } else if (selectedTab == "longbreak") {
            setTimeRemaining(timer.Duration.LongBreak)
        }
    }

    const handleSkip = () => {
        setIsRunning(false)
        timerRunningAudio?.pause()
        if (selectedTab == "focus") {
            selectTab("shortbreak")
        } else {
            selectTab("focus")
        }
    }

    const timerRunningAudioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined"
            ? new Audio("\\audio\\ticking-slow.mp3")
            : undefined
    );

    const timerCompletedAudioRef = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined"
            ? new Audio("\\audio\\timer-complete.mp3")
            : undefined
    );

    useMemo(() => {
        if (timerRunningAudioRef && timerRunningAudioRef.current) {
            timerRunningAudioRef.current.loop = true;
            setTimerRunningAudio(timerRunningAudioRef.current);
        }
    }, [timerRunningAudioRef]);

    useMemo(() => {
        if (timerCompletedAudioRef && timerCompletedAudioRef.current) {
            timerCompletedAudioRef.current.loop = false;
            setTimerFinishedAudio(timerCompletedAudioRef.current);
        }
    }, [timerCompletedAudioRef]);


    return (
        <div className="flex flex-col w-full h-full gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>Pomodoro Timer</CardTitle>
                    <CardDescription className="flex items-center justify-start gap-2">Select a task using the <FiPlay /> icon</CardDescription>
                </CardHeader>
                <CardContent>
                    {
                        !task &&
                        <div className="relative w-full h-[20vh]">
                            <Image
                                src={"/images/focus.png"}
                                alt="Empty task"
                                fill
                                className="object-contain"
                                priority={true}
                            />
                        </div>
                    }
                    {
                        task &&
                        <Tabs
                            defaultValue="focus"
                            value={selectedTab}
                            onValueChange={onTabChange}
                            className="flex-grow w-full h-full"
                        >
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger
                                    disabled={isRunning || !task}
                                    value="focus"
                                    onClick={() => selectTab("focus")}
                                >
                                    Focus
                                </TabsTrigger>
                                <TabsTrigger
                                    disabled={isRunning || !task}
                                    value="shortbreak"
                                    onClick={() => selectTab("shortbreak")}
                                >
                                    Short Break
                                </TabsTrigger>
                                <TabsTrigger
                                    disabled={isRunning || !task}
                                    value="longbreak"
                                    onClick={() => selectTab("longbreak")}
                                >
                                    Long Break
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-2">
                                <TabsContent value="focus" className="flex-grow h-full">
                                    <div className="flex-col items-center justify-center gap-2 w-full h-full text-center">
                                        <FiClock className="text-3xl w-full" />
                                        <div className="text-7xl font-bold text-gray-900 dark:text-gray-50">
                                            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="shortbreak" className="flex-grow h-full">
                                    <div className="flex-col items-center justify-center gap-2 w-full text-center">
                                        <FiClock className="text-3xl w-full" />
                                        <div className="text-7xl font-bold text-gray-900 dark:text-gray-50">
                                            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="longbreak" className="flex-grow h-full">
                                    <div className="flex-col items-center justify-center gap-2 w-full text-center">
                                        <FiClock className="text-3xl w-full" />
                                        <div className="text-7xl font-bold text-gray-900 dark:text-gray-50">
                                            {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    }
                </CardContent>
                <CardFooter>
                    {
                        task &&
                        <div className="flex items-center justify-center w-full gap-2">
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

                            <Button onClick={handleSkip}>
                                <FiSkipForward /> Skip
                            </Button>
                        </div>
                    }

                </CardFooter>
            </Card>
            <PomodoroChart />
        </div>
    )
}