

"use client";

import { Button } from "@/components/ui/button";
import { FiCheckSquare, FiLogOut, FiMoon, FiSettings, FiSun, FiTrash, FiUser } from "react-icons/fi";
import SignOutButton from "../auth/signout-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signout } from "@/app/actions/auth/auth";

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

    const LogOut = async () => {
        await signout()
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
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {
                                !darkMode &&
                                <Button variant="outline" size="icon" onClick={toggleTheme} ><FiMoon /></Button>
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
                                <Button variant="outline" size="icon" onClick={toggleTheme} ><FiSun /></Button>
                            }
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Light Mode</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button type="button" variant="outline" size="icon">
                                        <FiUser />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Profile: {user?.user_metadata?.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full flex align-center justify-start "
                                        >
                                            <FiUser /> Profile
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full flex align-center justify-start "
                                        >
                                            <FiSettings /> Settings
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Settings</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="w-full flex align-center justify-start "
                                            onClick={LogOut}
                                        >
                                            <FiLogOut /> Logout
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Logout</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div >
        </div >
    );
}
