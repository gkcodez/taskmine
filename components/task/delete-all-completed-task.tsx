"use client";

import { deleteCompletedTasks } from "@/app/actions/task/task";
import { Button } from "@/components/ui/button";
import { FiCheck } from "react-icons/fi";

export default function deleteAllCompletedTask({ onDelete }: { onDelete: any }) {

  const deleteAllCompletedTask = async () => {
    await deleteCompletedTasks();
    onDelete()
  }

  return (
    <Button
      variant="ghost"
      onClick={deleteAllCompletedTask}
      className="w-full flex items-start justify-start px-2"
    >
      <FiCheck /> Delete Completed Tasks
    </Button>
  );
}