import Task from "@/app/components/task/task";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { createClient } from "@/app/utils/supabase/server";
import { Separator } from "../ui/separator";
import AddTask from "./add-task";
import { Button } from "../ui/button";
import { FiCheck, FiDelete, FiMenu, FiMinus, FiMoreHorizontal, FiMoreVertical, FiTrash } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default async function TaskList() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw new Error(error.message);
  }

  const deleteCompletedTasks = async() => {
    "use client"
    await deleteCompletedTasks();
  }

  const deleteAllTasks = async() => {
    "use client"
    await deleteAllTasks();
  }
  return (
    <div>
        <div className="flex items-center justify-between p-2">
          <h3 className="text-gray-600 font-semibold ">Tasks ( {tasks &&
            tasks
              .filter((task) => {
                return task.is_complete == true;
              }).length
          } / {tasks &&
            tasks.length} )</h3>
            <div className="flex items-center justify-center gap-2">
            <AddTask />
            <DropdownMenu>
              <DropdownMenuTrigger><Button variant="secondary" size="icon" className="rounded-full"><FiMenu/></Button></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Delete</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><FiCheck /> Delete Completed Tasks</DropdownMenuItem>
                <DropdownMenuItem><FiMinus /> Delete All Tasks</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        <Separator className="border-b border-gray-100" />
        <ScrollArea className="h-96">
          <div className="flex flex-col px-3">
            {tasks &&
              tasks
                .filter((task) => {
                  return task.is_complete == false;
                })
                .map((task) => {
                  return <Task key={task.id} task={task} />;
                })}
            {tasks &&
              tasks
                .filter((task) => {
                  return task.is_complete;
                })
                .map((task) => {
                  return <Task key={task.id} task={task} />;
                })}
          </div>
        </ScrollArea>
    </div>
  );
}