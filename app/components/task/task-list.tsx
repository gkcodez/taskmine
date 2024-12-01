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
      <div className="p-2">

        <h3 className="text-sky-600 font-semibold">To do ( {tasks &&
          tasks
            .filter((task) => {
              return task.is_complete == false;
            }).length
        } / {tasks &&
          tasks.length} )</h3>
        <ScrollArea className="h-60 px-5">
          <div className="flex flex-col">
            {tasks &&
              tasks
                .filter((task) => {
                  return task.is_complete == false;
                })
                .map((task) => {
                  return <Task key={task.id} task={task} />;
                })}
          </div>
        </ScrollArea>
      </div>
      <div className="p-2">
        <h3 className="text-sky-600 font-semibold">Completed ( {tasks &&
          tasks
            .filter((task) => {
              return task.is_complete == true;
            }).length
        } / {tasks &&
          tasks.length} )</h3>
        <ScrollArea className="h-60 px-5">
          <div className="flex flex-col">
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
    </div>
  );
}