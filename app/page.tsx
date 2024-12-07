"use client"

import { getCurrentUser } from "@/app/actions/auth/auth";
import { addPomodoro } from "@/app/actions/pomodoro/pomodoro";
import Navbar from "@/components/navbar/navbar";
import Pomodoro from "@/components/pomodoro/pomodoro";
import TaskList from "@/components/task/task-list";
import { ITask } from "@/models/task";
import { useEffect, useState } from "react";


export default function Home() {
  const [selectedTask, setSelectedTask] = useState<ITask>()
  const [isFocusComplete, setIsFocusComplete] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState(null)


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

  const getLoggedInUser = async () => {
    const user = await getCurrentUser();
    console.log(user)
    setCurrentUser(user)
  }

  useEffect(() => {
    getLoggedInUser()
  }, [])

  return (
    <main className="flex flex-col items-center sm:justify-center justify-start w-full h-full">
      <Navbar user={currentUser} />
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