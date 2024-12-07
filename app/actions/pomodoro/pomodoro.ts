"use server";

import { IPomodoro } from "@/models/pomodoro";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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



export async function fetchPomodorosForLast7Days() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Convert dates to ISO strings
    const todayISO = today.toISOString();
    const sevenDaysAgoISO = sevenDaysAgo.toISOString();

    // Fetch rows for the last 7 days
    const { data, error } = await supabase
        .from('pomodoros')
        .select('actual_pomodoro_count, created_on')
        .gte('created_on', sevenDaysAgoISO)
        .lte('created_on', todayISO);

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    const pomodorosForLast7Days: Record<string, number> = {};

    data?.forEach(row => {
        const date = new Date(row.created_on).toISOString().split('T')[0]; // Extract date
        pomodorosForLast7Days[date] = (pomodorosForLast7Days[date] || 0) + row.actual_pomodoro_count; // Sum marks for each date
    });

    const result = Object.entries(pomodorosForLast7Days).map(([date, focus]) => ({
        focus
    }));

    revalidatePath("/");
    return result
}