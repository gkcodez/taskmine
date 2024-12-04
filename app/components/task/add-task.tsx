"use client";

import { useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { addTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FiPlus } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";
import { Label } from "@/app/components/ui/label";

export default function AddTask() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = React.useState(false)

  const addNewTask = async (formData: any) => {
    const task: ITask = {
      task: formData.get("task") as string,
      priority: formData.get("priority") as number,
      is_completed: false,
      is_deleted: false,
      pomodoro_count: formData.get("pomodoro_count") as number,
      created_on: new Date(),
      updated_on: new Date()
    }
    console.log(task)
    await addTask(task);
    formRef.current?.reset();
    setOpen(false)
  }

  const handleSaveChanges = () => { formRef.current?.requestSubmit(); };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" size="icon" className="rounded-full">
          <FiPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col outline-none items-start gap-2"
          ref={formRef}
          action={addNewTask}
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
          <Button type="submit" onClick={handleSaveChanges}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}