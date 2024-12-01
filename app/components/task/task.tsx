
"use client";

import { deleteTask,  onCheckChange } from "@/app/actions/task/task";
import type { Task } from "@/app/models/task";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function Task({ task }: { task: Task }) {
  const [description, setDescription] = useState(task.task);
  // const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
  //   null,
  // );

  useEffect(() => {
    setDescription(task.task);
  }, [task.task]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = e.target.value;
  //   setDescription(newValue);

  //   // Clear previous timeout if exists
  //   if (typingTimeout) {
  //     clearTimeout(typingTimeout);
  //   }

  //   // Set a new timeout
  //   setTypingTimeout(
  //     setTimeout(async () => {
  //       await editTask({ ...task, task: e.target.value });
  //     }, 2000),
  //   );
  // };
  return (
    <div>
      <div className="flex items-center gap-1">
        <form
          className="flex-1 flex items-center"
        // action={async () => {
        //   "use server";

        //   await editTask(task);
        // }}
        >
          <Checkbox
            className="mt-0.5 w-5 h-5"
            id={task?.id as unknown as string}
            checked={task?.is_complete}
            onCheckedChange={() => onCheckChange(task)}
          />
          <h3 className="p-2">{description}</h3>
        </form>
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={async () => {
            await deleteTask(task.id);
          }}
        >
          <div>
            <FiEdit className="text-gray-600" />
          </div>
        </Button>
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
        </Button>
      </div>
      <Separator className="border-b border-gray-100" />
    </div>
  );
}