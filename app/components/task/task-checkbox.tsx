"use client";

import { Checkbox } from "@/app/components/ui/checkbox";
import { onCheckChange } from "@/app/actions/task/task";
import type { Task } from "@/app/models/task";

export default function TaskCheckbox({ task }: { task: Task }) {
  return (
    <Checkbox
      className="mt-0.5 w-5 h-5"
      id={task?.id as unknown as string}
      checked={task?.is_complete}
      onCheckedChange={() => onCheckChange(task)}
    />
  );
}