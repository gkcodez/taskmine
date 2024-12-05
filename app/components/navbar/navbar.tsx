

"use client";

import { Button } from "@/app/components/ui/button";
import { FiCheckSquare, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import SignOutButton from "../auth/signout-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {

    const { setTheme } = useTheme()
    const [darkMode, setDarkMode] = useState<boolean>()

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
                {
                    !darkMode &&
                    <Button variant="outline" onClick={toggleTheme} ><FiMoon /></Button>
                }
                {
                    darkMode &&
                    <Button variant="outline" onClick={toggleTheme} ><FiSun /></Button>
                }

                <Button variant="outline"><FiSettings /></Button>
                <SignOutButton />
            </div>
        </div >
    );
}
