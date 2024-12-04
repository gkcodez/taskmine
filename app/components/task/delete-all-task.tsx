"use client";

import { deleteAllTasks } from "@/app/actions/task/task";
import { Button } from "@/app/components/ui/button";
import { FiMinus } from "react-icons/fi";

export default function deleteAllTask({ onDelete }: { onDelete: any }) {

  const deleteAllTask = async () => {
    await deleteAllTasks();
    onDelete()
  }

  return (
    <Button
      variant="ghost"
      onClick={deleteAllTask}
      className="w-full flex items-start justify-start px-2"
    >
      <FiMinus /> Delete All Tasks
    </Button>
  );
}