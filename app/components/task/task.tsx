
"use client";

import { deleteTask, onCheckChange } from "@/app/actions/task/task";
import type { ITask } from "@/app/models/task";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { FiChevronDown, FiChevronsUp, FiChevronUp, FiClock, FiEdit, FiMeh, FiMinus, FiMoreVertical, FiPlay, FiSend, FiTarget, FiTrash } from "react-icons/fi";
import UpdateTask from "./update-task";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useMemo, useRef, useState } from "react";

export default function Task({ task, onDeleteTask, onCheckTask, onUpdateTask, onTaskFocus }: { task: ITask, onDeleteTask: any, onCheckTask: any, onUpdateTask: any, onTaskFocus: any }) {

  const [taskCompletedAudio, setTaskCompletedAudio] = useState<HTMLAudioElement>();


  const deleteSelectedTask = async (taskId: number | undefined) => {
    const tasks = await deleteTask(taskId);
    onDeleteTask(tasks)
  }

  const checkSelectedTask = async () => {
    if (!task.is_completed) {
      taskCompletedAudio?.play()
    }
    const tasks = await onCheckChange(task);
    onCheckTask(tasks)

  }

  const updateSelectedTask = async () => {
    onUpdateTask()
  }

  const focusTask = () => {
    onTaskFocus(task)
  }

  const taskCompletedAudioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("\\audio\\task-complete.mp3")
      : undefined
  );


  useMemo(() => {
    if (taskCompletedAudioRef && taskCompletedAudioRef.current) {
      taskCompletedAudioRef.current.loop = false;
      setTaskCompletedAudio(taskCompletedAudioRef.current);
    }
  }, [taskCompletedAudioRef]);

  return (
    <div className="flex items-center gap-1">
      <form
        className="flex-1 flex items-center"
      >
        <Checkbox
          className={`mt-0.5 w-5 h-5 ${task.is_completed ? "opacity-30" : "opacity-100"}`}
          id={task?.id as unknown as string}
          checked={task?.is_completed}
          onCheckedChange={checkSelectedTask}
        />
        <h3 className={`p-2 ${task.is_completed ? "opacity-30" : "opacity-100"}`}>{task.title}</h3>

      </form>
      <div className="flex items-center justify-center gap-2">
        {
          task.estimated_pomodoro_count &&
          <Badge variant="outline" className={`rounded-full ${task.is_completed ? "opacity-30" : "opacity-100"}`}>{task.actual_pomodoro_count ?? 0} / {task.estimated_pomodoro_count}</Badge>
        }
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={focusTask}><FiClock />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Focus on task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center gap-2">
              {
                task.priority == 1 &&
                <FiChevronsUp className={`text-red-600 ${task.is_completed ? "opacity-30" : "opacity-100"}`} />
              }
              {
                task.priority == 2 &&
                <FiChevronUp className={`text-orange-600 ${task.is_completed ? "opacity-30" : "opacity-100"}`} />
              }
              {
                task.priority == 3 &&
                <FiMinus className={`text-yellow-600 ${task.is_completed ? "opacity-30" : "opacity-100"}`} />
              }
              {
                task.priority == 4 &&
                <FiChevronDown className={`text-green-600 ${task.is_completed ? "opacity-30" : "opacity-100"}`} />
              }
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Priority</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenu>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="rounded-full">
                  <FiMoreVertical />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Actions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild><UpdateTask currentTask={task} onUpdateTask={updateSelectedTask} /></DropdownMenuItem>
          <DropdownMenuItem onClick={() => deleteSelectedTask(task.id)}><FiTrash /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}