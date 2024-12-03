import Task from "@/app/components/task/task";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { createClient } from "@/app/utils/supabase/server";
import { Separator } from "../ui/separator";
import AddTask from "./add-task";

export default async function TaskList() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div>
        <div className="flex items-center justify-between p-2">
          <h3 className="text-gray-600 font-semibold py-2">Tasks ( {tasks &&
            tasks
              .filter((task) => {
                return task.is_complete == true;
              }).length
          } / {tasks &&
            tasks.length} )</h3>
            <AddTask />
        </div>
        <Separator className="border-b border-gray-100" />
        <ScrollArea className="h-full">
          <div className="flex flex-col">
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