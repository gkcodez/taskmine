
"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { ITask } from "@/app/models/task";
import { IPomodoro } from "@/app/models/pomodoro";

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
        estimated_pomodoro_count: task.estimated_pomodoro_count ? task.estimated_pomodoro_count : null,
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
      user_id: user?.id,
      title: task.title,
      priority: task.priority ? task.priority : null,
      estimated_pomodoro_count: task.estimated_pomodoro_count ? task.estimated_pomodoro_count : null,
      is_completed: task.is_completed,
      is_deleted: task.is_deleted,
      created_on: task.created_on,
      updated_on: task.updated_on,
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

export async function incrementTaskActualPomodoroCount(task: ITask) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("tasks")
    .update({ actual_pomodoro_count: task?.actual_pomodoro_count ? task?.actual_pomodoro_count + 1 : 1 })
    .eq("user_id", user?.id)
    .eq("id", task?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}


export async function addPomodoro(pomodoro: IPomodoro) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let selected_pomodoro;

  if (pomodoro.task_id) {
    const { data, error: fetchError } = await supabase
      .from('pomodoros')
      .select('*')
      .eq("user_id", user?.id)
      .eq("task_id", pomodoro.task_id)
      .limit(1)
      .maybeSingle();
    selected_pomodoro = data;

    if (fetchError) {
      throw new Error(fetchError.message);
      return;
    }
  }
  else {
    const { data, error: fetchError } = await supabase
      .from('pomodoros')
      .select('*')
      .eq("user_id", user?.id)
      .is("task_id", null)
      .limit(1)
      .maybeSingle();
    selected_pomodoro = data;

    if (fetchError) {
      throw new Error(fetchError.message);
      return;
    }
  }

  if (selected_pomodoro?.id) {
    const { data: updatedPomodoro, error: updateError } = await supabase
      .from('pomodoros')
      .update({
        actual_pomodoro_count: selected_pomodoro.actual_pomodoro_count + 1,
        updated_on: new Date()
      })
      .eq("user_id", user?.id)
      .eq('id', selected_pomodoro.id);
    if (updateError) {
      throw new Error(updateError.message);
    }
  }
  else {
    const { data: newPomodoro, error: insertError } = await supabase
      .from('pomodoros')
      .insert([{
        user_id: user?.id,
        actual_pomodoro_count: 1,
        created_on: new Date(),
        updated_on: new Date(),
        task_id: pomodoro.task_id,
      }])
      .eq("user_id", user?.id)

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  revalidatePath("/");
}