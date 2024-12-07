"use client";

import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { FiSliders } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function SortAndFilterTask({
    onSortTask,
}: {
    onSortTask: any;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    const [sortBy, setSortBy] = useState<string | undefined>();
    const [sortDirection, setSortDirection] = useState<string | undefined>();

    const sortAndFilterTask = async (formData: any) => {
        const sortBy = formData.get("sortBy") as string;
        const sortDirection = formData.get("sortDirection") as string;
        const sortAscending = sortDirection == "ascending" ? true : false;
        onSortTask(sortBy, sortAscending);
        formRef.current?.reset();
    }


    const handleSortByChange = (sortBy: string) => {
        setSortBy(sortBy);
    };

    const handleSortDirectionChange = () => {
        setSortDirection(sortDirection);
    };

    return (
        <Popover>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <FiSliders />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Sort and filter task</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent>
                <form
                    className="flex flex-col outline-none items-start gap-2"
                    ref={formRef}
                    action={sortAndFilterTask}
                >
                    <Select name="sortBy" value={sortBy} onValueChange={handleSortByChange} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title">Title</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="pomodoro_count">Pomodoros</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select name="sortDirection" value={sortDirection} onValueChange={handleSortDirectionChange} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort Direction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ascending">Ascending</SelectItem>
                            <SelectItem value="descending">Descending</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit"> Submit</Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}