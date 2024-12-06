"use client"

import Task from "@/app/components/task/task";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "../ui/separator";
import AddTask from "./add-task";
import { Button } from "../ui/button";
import { FiCheck, FiMenu, FiSliders, FiTrash, FiX } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import TaskActions from "./task-action";
import DeleteAllCompletedTask from "./delete-all-completed-task";
import DeleteAllTask from "./delete-all-task";
import SearchTask from "./search-task";
import { useEffect, useState } from "react";
import { fetchAllTasks, fetchSearchResults } from "@/app/actions/task/task";
import SortAndFilterTask from "./sort-and-filter-task";
import { ITask } from "@/app/models/task";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function TaskList({ onTaskFocusStart, isTaskFocusComplete }: { onTaskFocusStart: any, isTaskFocusComplete: any }) {

  const [tasks, setTasks] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<boolean>(false);

  const searchTasks = async (taskName: string) => {
    const tasks = await fetchSearchResults(taskName)
    setTasks(tasks);
    setFiltered(true);
  };

  const sortAndFilterTasks = async (orderby: string = "title", ascending: boolean = true) => {
    const tasks = await fetchAllTasks(orderby = orderby, ascending = ascending);
    setTasks(tasks)
    setFiltered(false);
  }

  const fetchTasks = async () => {
    const tasks = await fetchAllTasks();
    setTasks(tasks)
    setFiltered(false);
  }

  const focusTask = (task: ITask) => {
    onTaskFocusStart(task)
  }

  useEffect(() => {
    fetchTasks();
  }, [isTaskFocusComplete]);


  return (
    <Card className="flex flex-col w-full min-h-[calc(100vh-180px)]">
      <CardHeader className="w-full h-20">
        <CardTitle className="flex items-center justify-between gap-2 ">Tasks ( {tasks &&
          tasks
            .filter((task) => {
              return task.is_completed == true;
            }).length
        } / {tasks &&
          tasks.length} )
          <div className="flex items-center justify-center gap-2">
            <AddTask onAddTask={fetchTasks} />
            {
              !filtered &&
              <SearchTask onSearchTask={(taskName: string) => searchTasks(taskName)} />
            }
            {
              filtered &&
              <Button variant="secondary" size="icon" onClick={fetchTasks} className="rounded-full"><FiX /></Button>
            }
            <SortAndFilterTask onSortTask={(sortBy: string, sortAscending: false) => sortAndFilterTasks(sortBy, sortAscending)} />

            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="secondary" size="icon" className="rounded-full">
                        <FiMenu />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><DeleteAllCompletedTask onDelete={fetchTasks} /></DropdownMenuItem>
                <DropdownMenuItem><DeleteAllTask onDelete={fetchTasks} /></DropdownMenuItem>
                <DropdownMenuLabel>Miscellaneous</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button variant="ghost" className="w-full flex items-start justify-start px-2">
                    <FiTrash /> Recycle bin
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


          </div>
        </CardTitle>
        <CardDescription>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex-grow w-full">
        <ScrollArea className="w-full  h-[calc(100vh-260px)]">
          <div className="flex flex-col px-2">
            {tasks &&
              tasks
                .filter((task) => {
                  return task.is_completed == false;
                })
                .map((task) => {
                  return <Task key={task.id} task={task} onDeleteTask={fetchTasks} onCheckTask={fetchTasks} onUpdateTask={fetchTasks} onTaskFocus={(task: ITask) => focusTask(task)} />;
                })}
            {tasks &&
              tasks
                .filter((task) => {
                  return task.is_completed;
                })
                .map((task) => {
                  return <Task key={task.id} task={task} onDeleteTask={fetchTasks} onCheckTask={fetchTasks} onUpdateTask={fetchTasks} onTaskFocus={(task: ITask) => focusTask(task)} />;
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