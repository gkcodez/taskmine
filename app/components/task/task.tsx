
import TaskData from "./task-data";
import TaskCheckbox from "./task-checkbox";
import DeleteTask from "./delete-task";

import { editTask } from "@/app/actions/task/task";
import type { Task } from "@/app/models/task";

export default async function Task({ task }: { task: Task }) {
  return (
    <div className="flex items-center gap-2">
      <form
        className="flex-1 flex items-center gap-2"
        action={async () => {
          "use server";

          await editTask(task);
        }}
      >
        <TaskCheckbox task={task} />
        <TaskData task={task} />
      </form>
      <DeleteTask id={task.id} />
    </div>
  );
}