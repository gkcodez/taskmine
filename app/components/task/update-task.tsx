"use client";

import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { editTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { FiChevronDown, FiChevronsUp, FiChevronUp, FiEdit, FiMinus } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export default function UpdateTask({
  currentTask,
  onUpdateTask
}: {
  currentTask: ITask,
  onUpdateTask: any
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<string | undefined>();

  const getPriorityNumber = (priority: string) => {
    let priorityNumber;
    if (priority === "critical") {
      priorityNumber = 1;
    } else if (priority === "high") {
      priorityNumber = 2;
    } else if (priority === "medium") {
      priorityNumber = 3;
    } else if (priority === "low") {
      priorityNumber = 4;
    }
    return priorityNumber
  }

  const getPriority = (priorityNumber: number | undefined) => {
    let priorityValue;
    if (priorityNumber === 1) {
      priorityValue = "critical";
    } else if (priorityNumber === 2) {
      priorityValue = "high";
    } else if (priorityNumber === 3) {
      priorityValue = "medium";
    } else if (priorityNumber === 4) {
      priorityValue = "low";
    }
    return priorityValue
  }


  const updateTask = async (formData: any) => {
    if (!currentTask.id) return;
    const priority = formData.get("priority") as string;
    const priorityNumber = getPriorityNumber(priority)
    const updatedTask = {
      id: currentTask.id,
      title: formData.get("title") as string,
      priority: priorityNumber,
      pomodoro_count: formData.get("pomodoro_count") as number,
      is_completed: false,
      is_deleted: false,
      created_on: new Date(),
      updated_on: new Date(),
    };

    await editTask(updatedTask);
    onUpdateTask()
    formRef.current?.reset();
    setOpen(false);
  };

  const handlePriorityChange = (priority: string) => {
    setPriority(priority);
  };

  const handleSaveChanges = () => {
    formRef.current?.requestSubmit();
  };


  const openEditDialog = (task: ITask) => {
    const priorityNumber = task.priority;
    const priority = getPriority(priorityNumber)
    setPriority(priority)
    setOpen(true);
    setTimeout(() => {
      const taskTitleInput = formRef.current?.elements.namedItem("title") as HTMLInputElement;
      const taskPrioritySelect = formRef.current?.elements.namedItem("priority") as HTMLSelectElement;
      const taskPomodoroInput = formRef.current?.elements.namedItem("pomodoro_count") as HTMLInputElement;
      if (taskTitleInput) taskTitleInput.value = task.title;
      if (taskPrioritySelect) taskPrioritySelect.value = priority ? priority : "";
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
              id="title"
              className="p-2 focus-visible:ring-transparent"
              name="title"
              placeholder="Task name"
              required
            />
            <div className="flex items-center justify-start gap-2 w-full">
              <Select name="priority" value={priority} onValueChange={handlePriorityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical"><div className="flex items-center justify-center gap-2"><FiChevronsUp className="text-red-600" /> Critical</div></SelectItem>
                  <SelectItem value="high"><div className="flex items-center justify-center gap-2"><FiChevronUp className="text-orange-600" /> High</div></SelectItem>
                  <SelectItem value="medium"><div className="flex items-center justify-center gap-2"><FiMinus className="text-yellow-600" /> Medium</div></SelectItem>
                  <SelectItem value="low"><div className="flex items-center justify-center gap-2"><FiChevronDown className="text-green-600" /> Low</div></SelectItem>
                </SelectContent>
              </Select>
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