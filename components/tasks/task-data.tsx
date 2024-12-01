"use client";

import { useEffect, useState } from "react";
import { editTask } from "@/actions/tasks/actions";
import { Input } from "@/components/ui/input";
import type { Task } from "@/lib/interface";

export default function TaskData({ task }: { task: Task }) {
  const [description, setDescription] = useState(task.task);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    setDescription(task.task);
  }, [task.task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);

    // Clear previous timeout if exists
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    setTypingTimeout(
      setTimeout(async () => {
        await editTask({ ...task, task: e.target.value });
      }, 2000),
    );
  };

  return (
    <Input
      className="p-0 border-none focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}