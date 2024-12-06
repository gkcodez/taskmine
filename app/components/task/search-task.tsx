"use client";

import { Button } from "@/app/components/ui/button";
import { useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function SearchTask({
    onSearchTask,
}: {
    onSearchTask: any;
}) {
    const formRef = useRef<HTMLFormElement>(null);

    const searchTask = async (formData: any) => {
        const taskName = formData.get("search") as string;
        onSearchTask(taskName);
        formRef.current?.reset();
    }

    return (
        <Popover>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <FiSearch />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Search task</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent>
                <form
                    className="flex flex-col outline-none items-start gap-2"
                    ref={formRef}
                    action={searchTask}
                >
                    <Input
                        id="search"
                        className="p-2 focus-visible:ring-transparent"
                        name="search"
                        placeholder="Search task"
                        required
                    />
                </form>
            </PopoverContent>
        </Popover>
    );
}