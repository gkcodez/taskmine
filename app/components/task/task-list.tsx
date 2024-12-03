import Task from "@/app/components/task/task";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { createClient } from "@/app/utils/supabase/server";
import { Separator } from "../ui/separator";
import AddTask from "./add-task";
import { Button } from "../ui/button";
import { FiCheck, FiDelete, FiMenu, FiMinus, FiMoreHorizontal, FiMoreVertical, FiPause, FiPlay, FiPlus, FiRefreshCw, FiTrash } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import TaskActions from "./task-action";

export default async function TaskList() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw new Error(error.message);
  }

  const deleteCompletedTasks = async () => {
    "use client"
    await deleteCompletedTasks();
  }

  const deleteAllTasks = async () => {
    "use client"
    await deleteAllTasks();
  }
  return (
        <Card className="flex flex-col w-full min-h-[calc(100vh-80px)]">
          <CardHeader className="w-full h-20">
            <CardTitle className="flex items-center justify-between gap-2 ">Tasks ( {tasks &&
              tasks
                .filter((task) => {
                  return task.is_complete == true;
                }).length
            } / {tasks &&
              tasks.length} )
              <div className="flex items-center justify-center gap-2">
                <AddTask />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="secondary" size="icon" className="rounded-full">
                      <FiMenu />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Delete</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><FiCheck /> Delete Completed Tasks</DropdownMenuItem>
                    <DropdownMenuItem><FiMinus /> Delete All Tasks</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <Separator/>
          <CardContent className="flex-grow w-full">
            <ScrollArea className="w-full  h-[calc(100vh-260px)]">
              <div className="flex flex-col px-2">
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
          </CardContent>
          <CardFooter className="w-full">
          <div className="flex flex-col w-full">
          <Separator />
          <TaskActions />
          </div>
          </CardFooter>
        </Card>
  );
}