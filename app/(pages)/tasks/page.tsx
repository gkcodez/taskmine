
import TaskActions from "@/app/components/task/task-action";
import TaskList from "@/app/components/task/task-list";
import { Separator } from "@/app/components/ui/separator";
import { SidebarSeparator } from "@/app/components/ui/sidebar";

export default function Tasks() {

  return (
    <div className="flex flex-col w-full h-full">
      <TaskList />
    </div>
  );
}