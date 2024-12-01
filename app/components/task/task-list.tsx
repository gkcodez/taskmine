import Task from "@/app/components/task/task";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { createClient } from "@/app/utils/supabase/server";

export default async function TaskList() {
    const supabase = await createClient();

    const { data: tasks, error } = await supabase.from("tasks").select("*");
  
    if (error) {
      throw new Error(error.message);
    }
  
    return (
       <div>
        <ScrollArea className="h-96 p-5">
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