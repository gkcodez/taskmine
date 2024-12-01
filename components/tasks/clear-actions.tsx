"use client";

import { Button } from "@/components/ui/button";
import { deleteCompletedTasks, deleteAllTasks } from "@/actions/tasks/actions";

export default function ClearActions() {
  return (
    <div className="flex items-center gap-2 border-t pt-2">
      <Button
        onClick={async () => {
          await deleteCompletedTasks();
        }}
        size="sm"
        variant="outline"
      >
        Clear Completed Tasks
      </Button>
      <Button
        onClick={async () => {
          await deleteAllTasks();
        }}
        className="ml-auto"
        size="sm"
      >
        Clear All Tasks
      </Button>
    </div>
  );
}