"use client"

import { addPomodoro } from "@/app/actions/pomodoro/pomodoro";
import Navbar from "@/app/components/navbar/navbar";
import Pomodoro from "@/app/components/pomodoro/pomodoro";
import TaskList from "@/app/components/task/task-list";
import { ITask } from "@/app/models/task";
import { useState } from "react";



export default function Home() {

    const [selectedTask, setSelectedTask] = useState<ITask>()
    const [isFocusComplete, setIsFocusComplete] = useState<boolean>(false)

    const startTaskFocus = (task: ITask) => {
        setSelectedTask(task)
    }

    const completeTaskFocus = async (task: ITask) => {
        setIsFocusComplete(false)
        const pomodoro = {
            task_id: task?.id
        }
        await addPomodoro(pomodoro)
        setIsFocusComplete(true)
    }

    return (
        <main className="flex flex-col items-center sm:justify-center justify-start w-full h-full">
            <Navbar />
            <div className="flex flex-col lg:flex-row gap-2 p-2 w-full">
                <div className="lg:basis-9/12 w-full">
                    <TaskList onTaskFocusStart={(task: ITask) => startTaskFocus(task)} isTaskFocusComplete={isFocusComplete} />
                </div>
                <div className="lg:basis-3/12 w-full">
                    <Pomodoro task={selectedTask} onTaskFocusComplete={completeTaskFocus} />
                </div>
            </div>
        </main>
    );
}