
"use client";

import { deleteTask, onCheckChange } from "@/app/actions/task/task";
import type { ITask } from "@/app/models/task";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { FiEdit, FiMeh, FiMoreVertical, FiTarget, FiTrash } from "react-icons/fi";
import UpdateTask from "./update-task";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Task({ task }: { task: ITask }) {

  const deleteSelectedTask = async (taskId: number | undefined) => {
    await deleteTask(taskId);
  }

  return (
    <div className="p-1">
      <div className="flex items-center gap-1">
        <form
          className="flex-1 flex items-center"
        >
          <Checkbox
            className={`mt-0.5 w-5 h-5 ${task.is_complete ? "opacity-30" : "opacity-100"}`}
            id={task?.id as unknown as string}
            checked={task?.is_complete}
            onCheckedChange={() => onCheckChange(task)}
          />
          <h3 className={`p-2 ${task.is_complete ? "opacity-30" : "opacity-100"}`}>{task.task}</h3>
        </form>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger><FiMoreVertical className="text-gray-600" /></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><FiEdit /> Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteSelectedTask(task.id)}><FiTrash /> Delete</DropdownMenuItem>
                <DropdownMenuLabel>Others</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><FiTarget />  Focus</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        {/* <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={async () => {
            await deleteTask(task.id);
          }}
        >
          <div>
            <FiClock className="text-gray-600" />
          </div>
        </Button>
        <UpdateTask currentTask={task} />
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={async () => {
            await deleteTask(task.id);
          }}
        >
          <div>
            <FiTrash className="text-red-600" />
          </div>
        </Button> */}
      </div>
      <Separator className="border-b border-gray-50" />
    </div>
  );
}