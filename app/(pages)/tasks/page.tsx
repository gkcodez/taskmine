
import AddTask from "@/app/components/task/add-task";
import TaskActions from "@/app/components/task/task-action";
import TaskList from "@/app/components/task/task-list";

export default function Tasks() {

  return (
    <div className="flex-1 overflow-auto border rounded-lg p-3">
      <AddTask />
      <TaskList />
      <TaskActions />
    </div>
  );
}