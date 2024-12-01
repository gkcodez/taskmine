"use client";

import { useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { addTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FiPlus } from "react-icons/fi";
import React from "react";

export default function AddTask() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = React.useState(false)

  const addNewTask = async (formData: any) => {
    await addTask(formData);
    formRef.current?.reset();
    setOpen(false)
  }

  const handleSaveChanges = () => {
    formRef.current?.requestSubmit(); // Submit the form, which triggers the server action
  };

  return (   
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-full w-10 h-10 p-0 "><FiPlus className=""/></Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <form
          className="flex outline-none items-center gap-2 mb-2"
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

        <DialogFooter>
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