import { Routes } from '@angular/router';
import { TaskList } from './features/pages/task-list/task-list';

export const routes: Routes = [
  { 
    path: 'tasks', 
    component: TaskList,
    title: 'Задачи - TaskMaster'
  },
  { 
    path: 'categories/:category', 
    component: TaskList,
    title: 'Задачи по категории - TaskMaster'
  },
  { 
    path: '', 
    redirectTo: '/tasks', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/tasks' 
  }
];
