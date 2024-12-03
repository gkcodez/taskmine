
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

import Tasks from "@/app/(pages)/tasks/page";
import SignOutButton from "@/app/components/auth/signout-button";
import AddTask from "./components/task/add-task";
import { FiCheckSquare, FiSettings } from "react-icons/fi";
import Pomodoro from "./(pages)/pomodoro/page";
import { FocusChart } from "./components/pomodoro/focus-chart";
import { Button } from "./components/ui/button";
import Navbar from "./components/navbar/navbar";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col items-center sm:justify-center justify-start w-full h-full">
      <Navbar/>
      <div className="flex flex-col lg:flex-row gap-2 p-2 w-full">
        <div className="lg:basis-9/12 w-full">
          <Tasks />
        </div>
        <div className="lg:basis-3/12 w-full">
          <Pomodoro />
        </div>
      </div>
    </main>
  );
}