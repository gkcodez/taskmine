"use client";

import { deleteAllTasks } from "@/app/actions/task/task";
import { Button } from "@/app/components/ui/button";
import { FiCheck, FiMinus } from "react-icons/fi";

export default function deleteAllTask() {

      
  return (
    <Button
      variant="ghost"
      onClick={async () => {await deleteAllTasks();
      }}
      className="w-full flex items-start justify-start px-2"
    >
      <FiMinus /> Delete All Tasks
    </Button>
  );
}