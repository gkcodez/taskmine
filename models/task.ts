
export interface ITask {
  id?: number;
  user_id?: string;
  title: string;
  priority?: number;
  estimated_pomodoro_count?: number;
  actual_pomodoro_count?: number;
  is_completed: boolean;
  is_deleted: boolean;
  created_on: Date;
  updated_on: Date;
  due_on: Date;
}