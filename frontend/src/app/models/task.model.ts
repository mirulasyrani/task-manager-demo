import { Category } from './category.model';
export type TaskStatus   = 'TODO'|'IN_PROGRESS'|'DONE'|'CANCELLED';
export type TaskPriority = 'LOW'|'MEDIUM'|'HIGH'|'CRITICAL';
export interface Task {
  id?: number; title: string; description?: string;
  status: TaskStatus; priority: TaskPriority;
  category?: Category; createdAt?: string; updatedAt?: string;
}
