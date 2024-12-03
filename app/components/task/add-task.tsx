"use client";

import { useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { addTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FiPlus } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";
import { Label } from "recharts";

export default function AddTask() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = React.useState(false)

  const addNewTask = async (formData: any) => {
    const task: ITask = {
      task: formData.get("task") as string,
      is_complete: false,
      inserted_at: new Date()
    }
    await addTask(task);
    formRef.current?.reset();
    setOpen(false)
  }

  const handleSaveChanges = () => { formRef.current?.requestSubmit(); };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
            <Button type="button" variant="default" size="icon" className="rounded-full">
              <FiPlus/>
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          className="flex outline-none items-center gap-2"
          ref={formRef}
          action={addNewTask}
        >
          <Input
            id="task"
            className="p-2 focus-visible:ring-transparent"
            name="task"
            placeholder="Read books"
            required
          />
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