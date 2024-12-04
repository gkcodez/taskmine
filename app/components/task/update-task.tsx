"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { editTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FiEdit } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";
import { DialogTrigger } from "@radix-ui/react-dialog";


export default function UpdateTask({
  currentTask,
}: {
  currentTask: ITask;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  const updateTask = async (formData: any) => {
    if (!currentTask.id) return;
    const updatedTask = {
      id: currentTask.id,
      task: formData.get("task") as string,
      priority: formData.get("priority") as number,
      pomodoro_count: formData.get("pomodoro_count") as number,
      is_completed: false,
      is_deleted: false,
      created_on: new Date(),
      updated_on: new Date(),
    };

    await editTask(updatedTask); // Pass task ID and updated data to Supabase
    formRef.current?.reset();
    setOpen(false);
  };

  const handleSaveChanges = () => {
    formRef.current?.requestSubmit();
  };

  const openEditDialog = (task: ITask) => {
    setOpen(true);
    setTimeout(() => {
      const taskNameInput = formRef.current?.elements.namedItem("task") as HTMLInputElement;
      const taskPriorityInput = formRef.current?.elements.namedItem("priority") as HTMLInputElement;
      const taskPomodoroInput = formRef.current?.elements.namedItem("pomodoro_count") as HTMLInputElement;
      if (taskNameInput) taskNameInput.value = task.task;
      if (taskPriorityInput) taskPriorityInput.value = task.priority ? task.priority.toString() : "";
      if (taskPomodoroInput) taskPomodoroInput.value = task.pomodoro_count ? task.pomodoro_count.toString() : "";
    }, 0);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            onClick={() => openEditDialog(currentTask)}
            className="w-full flex items-start justify-start px-2"
          >
            <FiEdit /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col outline-none items-center gap-2 mb-2"
            ref={formRef}
            action={updateTask}
          >
             <Input
            id="task"
            className="p-2 focus-visible:ring-transparent"
            name="task"
            placeholder="Task name"
            required
          />
          <div className="flex items-center justify-start gap-2 w-full">
          <Input
            id="priority"
            className="p-2 focus-visible:ring-transparent"
            name="priority"
            type="number"
            placeholder="Task priority. Eg: 1"
          />
          <Input
            id="pomodoro_count"
            className="p-2 focus-visible:ring-transparent"
            name="pomodoro_count"
            type="number"
            placeholder="Estimated pomodoros. Eg: 1"
          />
          </div>
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