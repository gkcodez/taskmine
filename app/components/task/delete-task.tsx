"use client";

import { Button } from "@/app/components/ui/button";
import { IoClose } from "react-icons/io5";
import { deleteTask } from "@/app/actions/task/task";

export default function DeleteTask({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-4 h-4"
      onClick={async () => {
        await deleteTask(id);
      }}
    >
      <IoClose />
    </Button>
  );
}