
"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ITask } from "@/app/models/task";

export async function addTask(task: ITask) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .insert([
      {
        user_id: user?.id,
        title: task.title,
        priority: task.priority ? task.priority : null,
        pomodoro_count: task.pomodoro_count ? task.pomodoro_count : null,
        is_completed: task.is_completed,
        is_deleted: task.is_deleted,
        created_on: task.created_on,
        updated_on: task.updated_on,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");

}

export async function editTask(task: ITask) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .update({
      title: task.title,
      priority: task.priority ? task.priority : null,
      pomodoro_count: task.pomodoro_count ? task.pomodoro_count : null,
      updated_on: task.updated_on
    })
    .eq("id", task.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(id?: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").update({ is_deleted: true }).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteCompletedTasks() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("is_completed", true);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteAllTasks() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function onCheckChange(task: ITask) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: !task?.is_completed })
    .eq("id", task?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}


export async function fetchSearchResults(taskName: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("user_id", user?.id)
    .eq("is_deleted", false)
    .textSearch('title', `'${taskName}'`);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
  return data;
}


export async function fetchAllTasks(orderby: string = "title", ascending: boolean = true) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("user_id", user?.id)
    .eq("is_deleted", false)
    .order(orderby, { ascending: ascending })

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/");
  return data;
}