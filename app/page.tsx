
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

import Tasks from "@/app/(pages)/tasks/page";
import SignOutButton from "@/app/components/auth/signout-button";
import AddTask from "./components/task/add-task";
import { FiCheckSquare } from "react-icons/fi";
import Pomodoro from "./(pages)/pomodoro/page";
import { FocusChart } from "./components/pomodoro/focus-chart";
import { Button } from "./components/ui/button";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col gap-4 items-center sm:justify-center justify-start w-full h-full">
      <div className="flex items-center justify-between gap-2 bg-gray-700 p-3  w-full h-full">
        <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-2"> 
          <FiCheckSquare className="h-8 w-8 text-white dark:text-sky-400" />
          <h1 className="w-full font-semibold text-2xl text-white">Taskmine</h1>
        </div>
        {/* <div className="flex items-center justify-center gap-2">
          <h3 className="w-full  text-white">Tasks</h3>
          <h3 className="w-full  text-white">Habits</h3>
        </div> */}
        </div>
        <div className="flex items-center justify-center gap-2">
        <Button variant="secondary">Settings</Button>
        <SignOutButton />
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-2 w-full h-full px-3">
        {/* <div className="flex items-center justify-between gap-4 pb-4 w-full">
            <AddTask />
          </div> */}
        <div className="flex-grow h-full">
          <Tasks />
        </div>
        <div className="flex-1 h-full">
          <Pomodoro />
        </div>
      </div>
    </main>
  );
}