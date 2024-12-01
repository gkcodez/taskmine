
export interface Task {
    id: number;
    user_id: string;
    task: string;
    is_complete: boolean;
    inserted_at: Date;
  }