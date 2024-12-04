

"use client";

import { Button } from "@/app/components/ui/button";
import { FiCheckSquare, FiMoon, FiSettings, FiSun } from "react-icons/fi";
import SignOutButton from "../auth/signout-button";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between gap-2 p-3 w-full bg-white">
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-2">
                    <FiCheckSquare className="text-4xl" />
                    <h1 className="w-full font-semibold text-2xl">Taskmine</h1>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button variant="outline"><FiSun /></Button>
                <Button variant="outline"><FiSettings /></Button>
                <SignOutButton />
            </div>
        </div>
    );
}
