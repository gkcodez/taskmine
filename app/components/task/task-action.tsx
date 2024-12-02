"use client";

import { Button } from "@/app/components/ui/button";
import { deleteCompletedTasks, deleteAllTasks } from "@/app/actions/task/task";
import SignOutButton from "../auth/signout-button";

export default function TaskActions() {
    return (
        <div className="flex items-center gap-2 border-t pt-2">
            <h3 className="text-sm text-gray-600">Pomodoros: 4</h3> |
            <h3 className="text-sm text-gray-600">Estimated completion time: 12:30 PM</h3>
            {/* <Button
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
            </Button> */}
        </div>
    );
}