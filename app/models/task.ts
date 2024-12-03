
export interface ITask {
    id?: number;
    user_id?: string;
    task: string;
    priority?: number;
    is_completed: boolean;
    is_deleted: boolean;
    created_on: Date;
    updated_on: Date;
  }