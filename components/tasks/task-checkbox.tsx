"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { onCheckChange } from "@/actions/tasks/actions";
import type { Task } from "@/lib/interface";

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