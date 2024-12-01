
import { createClient } from "@/utils/supabase/server";
import Task from "./task";
import AddTask from "./add-task";

export default async function Tasks() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 overflow-auto border rounded-lg p-3">
        <AddTask />
      <div className="flex flex-col gap-2 max-h-96 overflow-y-scroll">
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
    </div>
  );
}