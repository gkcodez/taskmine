
import TaskActions from "@/app/components/task/task-action";
import TaskList from "@/app/components/task/task-list";

export default function Tasks() {

  return (
    <div className="w-full h-full overflow-auto border rounded-lg p-3">
      <TaskList />
      <TaskActions />
    </div>
  );
}