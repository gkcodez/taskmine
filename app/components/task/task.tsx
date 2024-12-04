
"use client";

import { deleteTask, onCheckChange } from "@/app/actions/task/task";
import type { ITask } from "@/app/models/task";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { FiChevronDown, FiChevronsUp, FiChevronUp, FiEdit, FiMeh, FiMinus, FiMoreVertical, FiTarget, FiTrash } from "react-icons/fi";
import UpdateTask from "./update-task";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export default function Task({ task, onDeleteTask, onCheckTask, onUpdateTask }: { task: ITask, onDeleteTask: any, onCheckTask: any, onUpdateTask: any }) {

  const deleteSelectedTask = async (taskId: number | undefined) => {
    const tasks = await deleteTask(taskId);
    onDeleteTask(tasks)
  }

  const checkSelectedTask = async () => {
    const tasks = await onCheckChange(task);
    onCheckTask(tasks)
  }

  const updateSelectedTask = async () => {
    onUpdateTask()
  }

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
        <div className="flex items-center justify-center gap-2">
          {
            task.pomodoro_count &&
            <Badge variant="outline" className={`rounded-full ${task.is_completed ? "opacity-30" : "opacity-100"}`}>{task.pomodoro_count}</Badge>
          }
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <FiMoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Pomodoro</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Focus started!")}><FiTarget /> Focus</DropdownMenuItem>

            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><UpdateTask currentTask={task} onUpdateTask={updateSelectedTask} /></DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteSelectedTask(task.id)}><FiTrash /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}