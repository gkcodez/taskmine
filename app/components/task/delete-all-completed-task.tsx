"use client";

import { deleteCompletedTasks } from "@/app/actions/task/task";
import { Button } from "@/app/components/ui/button";
import { FiCheck } from "react-icons/fi";

export default function deleteAllCompletedTask() {

      
  return (
    <Button
      variant="ghost"
      onClick={async () => {await deleteCompletedTasks();
      }}
      className="w-full flex items-start justify-start px-2"
    >
      <FiCheck /> Delete Completed Tasks
    </Button>
  );
}