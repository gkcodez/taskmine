
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";

import Tasks from "@/app/(pages)/tasks/page";
import SignOutButton from "@/app/components/auth/signout-button";
import AddTask from "./components/task/add-task";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen flex flex-col gap-4 items-center sm:justify-center justify-start py-10 px-5">
      <div className="flex flex-col w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4 pb-4 w-full">
          <div className="flex items-center justify-center gap-2">          
            <CheckCircleIcon className="h-8 w-8 text-sky-500 dark:text-sky-400" />
          <h1 className="w-full font-semibold text-2xl text-sky-500">Taskmine</h1>
          </div>
       <AddTask />
      </div>
        <Tasks />
      </div>
      <SignOutButton />
    </main>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}