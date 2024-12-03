"use client";

import { Button } from "@/app/components/ui/button";
import { deleteCompletedTasks, deleteAllTasks } from "@/app/actions/task/task";
import SignOutButton from "../auth/signout-button";
import { Separator } from "../ui/separator";

export default function TaskActions() {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500 p-2">
            <p>Estimated Pomodoros: 4</p>
            |
            <p>Completed Pomodoros: 2</p>
            |
            <p>Estimated completion: 12:30 PM</p>
        </div>
    );
}