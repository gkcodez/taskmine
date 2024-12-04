
"use client";

import { deleteTask, onCheckChange } from "@/app/actions/task/task";
import type { ITask } from "@/app/models/task";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { FiChevronDown, FiChevronsUp, FiChevronUp, FiEdit, FiMeh, FiMinus, FiMoreVertical, FiTarget, FiTrash } from "react-icons/fi";
import UpdateTask from "./update-task";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import AddTask from "./add-task";
import { Badge } from "../ui/badge";

export default function Task({ task }: { task: ITask }) {

  const deleteSelectedTask = async (taskId: number | undefined) => {
    await deleteTask(taskId);
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <form
          className="flex-1 flex items-center"
        >
          <Checkbox
            className={`mt-0.5 w-5 h-5 ${task.is_completed ? "opacity-30" : "opacity-100"}`}
            id={task?.id as unknown as string}
            checked={task?.is_completed}
            onCheckedChange={() => onCheckChange(task)}
          />
          <h3 className={`p-2 ${task.is_completed ? "opacity-30" : "opacity-100"}`}>{task.task}</h3>

        </form>
        <div className="flex items-center justify-center gap-2">
          {
            task.pomodoro_count &&
            <Badge className="rounded-full">{task.pomodoro_count}</Badge>
          }
        </div>
        <div className="flex items-center justify-center gap-2">
          {
            task.priority == 1 &&
            <FiChevronsUp className="text-red-600" />
          }
          {
            task.priority == 2 &&
            <FiChevronUp className="text-orange-600" />
          }
          {
            task.priority == 3 &&
            <FiMinus className="text-yellow-600" />
          }
          {
            task.priority == 4 &&
            <FiChevronDown className="text-green-600" />
          }
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
              <DropdownMenuItem asChild><UpdateTask currentTask={task} /></DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteSelectedTask(task.id)}><FiTrash /> Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}