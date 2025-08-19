import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage-service';
import { NewTask, Task, TaskCategory, TaskFilter } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '../decorators/logger.decorator';

interface State {
  tasks: Task[],
  filter: TaskFilter,
  loading: boolean,
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private storageService = inject(StorageService);
  private storageKey = 'to-do-app';

  private state = signal<State>({
    tasks: [],
    filter: 'all',
    loading: false,
    error: null
  });

  tasks = computed(() => this.state().tasks);
  filter = computed(() => this.state().filter);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  filteredTasks = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();

    return filter === 'all' 
      ? [...tasks]
      : tasks.filter(t => t.category === filter)
  });

  constructor() {
    const taskData = this.storageService.getItem<Task[]>(this.storageKey);
    if (taskData) {
      this.state.update(state => ({
        ...state,
        tasks: taskData.map(task => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
      }))
    }

    effect(() => {
      try {
        this.storageService.setItem(this.storageKey, this.tasks());
      } catch (error) {
        console.error('Ошибка сохранения задач:', error);
        this.state.update(s => ({ ...s, error: 'Не удалось сохранить задачи' }));
      }
    })
  }
  
  @Logger()
  /**
   * Добавляет новую задачу
   * @param task - Данные задачи без служебных полей
   * @returns Созданная задача
   */
  addTask(task: NewTask): Task {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      completed: false,
      createdAt: new Date()
    };

    this.state.update(state => ({
      ...state,
      tasks: [newTask, ...state.tasks]
    }))

    return newTask
  }

  @Logger()
  /**
   * Обновляет задачу
   * @param id - id задачи
   * @param updates - Объект с обновлёнными полями
   */
  updateTask(id: string, updates: Partial<Task>): void {
    let updatedTask: Task | undefined;
    
    this.state.update(state => ({
      ...state,
      tasks: state.tasks.map(task => 
        task.id === id
          ? {
            ...task,
            ...updates
            }
          : task
      )
    }))
  }

  @Logger()
  /**
   * Удаляет задачу
   * @param id - id задачи
   */
  deleteTask(id: string): void {
    this.state.update(state => ({
      ...state,
      tasks: state.tasks.filter(task => task.id !== id)
    }))
  }

  @Logger()
  /**
   * Переключает поле completed задачи
   * @param id - id задачи
   */
  toggleComplete(id: string): void {
    this.state.update(state => ({
      ...state,
      tasks: state.tasks.map(task => 
        task.id === id 
          ? {...task, completed: !task.completed } 
          : task
      )
    }))
  }

  @Logger()
  setFilter(filter: TaskFilter): void {
    this.state.update(state => ({
      ...state,
      filter
    }))
  }
}
