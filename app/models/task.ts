
export interface ITask {
    id?: number;
    user_id?: string;
    title: string;
    priority?: number;
    pomodoro_count?: number;
    is_completed: boolean;
    is_deleted: boolean;
    created_on: Date;
    updated_on: Date;
  }