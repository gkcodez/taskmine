
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
        task: task.task,
        priority: task.priority ? task.priority : null,
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
    .update({ task: task.task, priority: task.priority ? task.priority : null, updated_on: task.updated_on })
    .eq("id", task.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTask(id?: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("tasks").update({is_deleted: true}).eq("id", id);

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