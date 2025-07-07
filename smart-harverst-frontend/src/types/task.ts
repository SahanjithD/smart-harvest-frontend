export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'delayed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  bedId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  requiresPhoto: boolean;
  completedDate?: Date;
  photoUrl?: string;
}

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description: string;
  completed: boolean;
  isCurrent?: boolean;
}
