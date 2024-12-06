
export interface IPomodoro {
    id?: number;
    user_id?: string;
    actual_pomodoro_count?: number;
    created_on: Date;
    updated_on: Date;
    task_id?: number;
}