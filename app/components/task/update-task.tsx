"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { editTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FiEdit } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";


export default function UpdateTask({
  currentTask,
}: {
  currentTask: ITask;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState<number | undefined>();

  const updateTask = async (formData: FormData) => {
    if (!taskId) return;
    const updatedTask = {
      task: formData.get("task") as string,
      is_complete: false,
      inserted_at: new Date(),
    };

    await editTask(taskId, updatedTask); // Pass task ID and updated data to Supabase
    formRef.current?.reset();
    setOpen(false);
  };

  const handleSaveChanges = () => {
    formRef.current?.requestSubmit();
  };

  const openEditDialog = (id: number | undefined, task: ITask) => {
    setTaskId(id);
    setOpen(true);
    setTimeout(() => {
      const taskNameInput = formRef.current?.elements.namedItem("task") as HTMLInputElement;
      if (taskNameInput) taskNameInput.value = task.task;
    }, 0);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openEditDialog(currentTask.id, currentTask)}
      >
        <FiEdit />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
          </DialogHeader>
          <form
            className="flex outline-none items-center gap-2 mb-2"
            ref={formRef}
            action={updateTask}
          >
            <Input
              id="task"
              className="p-2 focus-visible:ring-transparent"
              name="task"
              placeholder="Update task"
              required
            />
          </form>
          <DialogFooter className="flex items-center justify-center gap-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Discard
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSaveChanges}>
              Update Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}