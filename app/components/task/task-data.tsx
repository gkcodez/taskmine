"use client";

import { useEffect, useState } from "react";
import { editTask } from "@/app/actions/task/task";
import { Input } from "@/app/components/ui/input";
import type { Task } from "@/app/models/task";

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
      className="p-2 focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}