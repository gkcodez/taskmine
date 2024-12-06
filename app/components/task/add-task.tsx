"use client";

import { useRef } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { addTask } from "@/app/actions/task/task";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FiChevronDown, FiChevronsDown, FiChevronsUp, FiChevronUp, FiMinus, FiPlus } from "react-icons/fi";
import React from "react";
import { ITask } from "@/app/models/task";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function AddTask({
  onAddTask,
}: {
  onAddTask: any;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = React.useState(false)

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

  const addNewTask = async (formData: any) => {
    const priority = formData.get("priority") as string;
    const priorityNumber = getPriorityNumber(priority)
    const task: ITask = {
      title: formData.get("title") as string,
      priority: priorityNumber,
      is_completed: false,
      is_deleted: false,
      estimated_pomodoro_count: formData.get("estimated_pomodoro_count") as number,
      created_on: new Date(),
      updated_on: new Date(),
      due_on: new Date()
    }
    await addTask(task);
    onAddTask()
    formRef.current?.reset();
    setOpen(false)
  }

  const handleSaveChanges = () => { formRef.current?.requestSubmit(); };

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button type="button" variant="secondary" size="icon" className="rounded-full">
                <FiPlus />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add task</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
            id="title"
            className="p-2 focus-visible:ring-transparent"
            name="title"
            placeholder="Title"
            required
          />
          <div className="flex items-center justify-start gap-2 w-full">
            <Select name="priority">
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
              id="estimated_pomodoro_count"
              className="p-2 focus-visible:ring-transparent"
              name="estimated_pomodoro_count"
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
    </Dialog >

  );
}