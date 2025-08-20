export const TaskCategory = {
  STUDIES: 'Учеба',
  WORK: 'Работа',
  HOME: 'Дом'
} as const;
export type TaskCategory = typeof TaskCategory[keyof typeof TaskCategory];

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGHT: 'hight'
} as const;
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority];

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  createdAt: Date;
}

export type NewTask = Omit<Task, 'id' | 'createdAt' | 'completed'>;

export type TaskFilter = 'all' | TaskCategory;