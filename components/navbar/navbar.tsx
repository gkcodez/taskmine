

"use client";

import { Button } from "@/components/ui/button";
import { FiCheckSquare, FiMenu, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import SignOutButton from "../auth/signout-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function Navbar({ user }: { user: any }) {

    const { setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        const dark = theme == "dark" ? true : false
        setDarkMode(dark)
    }, []);

    const toggleTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme == "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
        const dark = theme == "light" ? true : false
        setDarkMode(dark)
    }



    return (
        <div className="flex items-center justify-between gap-2 p-3 w-full">
            <div className="flex items-center justify-center">
                < div className="flex items-center justify-center gap-2" >
                    <FiCheckSquare className="text-4xl" />
                    <h1 className="w-full font-semibold text-2xl">Taskmine</h1>
                </div >
            </div >
            <div className="flex items-center justify-center gap-2">
                <h3>{user?.user_metadata?.name}</h3>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {
                                !darkMode &&
                                <Button variant="outline" onClick={toggleTheme} ><FiMoon /></Button>
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Dark Mode</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {
                                darkMode &&
                                <Button variant="outline" onClick={toggleTheme} ><FiSun /></Button>
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Light Mode</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline"><FiSettings /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <SignOutButton />

            </div >
        </div >
    );
}
