import { Component, computed, effect, inject, viewChild, ViewChild } from '@angular/core';
import { FilterSelect } from "../../../shared/filter-select/filter-select";
import { TaskService } from '../../../core/services/task-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskCategory, TaskFilter, TaskPriority } from '../../../core/models/task.model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Checkbox } from "primeng/checkbox";
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { PriorityPipe } from '../../../shared/pipes/priority-pipe';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TaskDialog } from "../../../shared/task-dialog/task-dialog";
import { CategorySeverityPipe } from '../../../shared/pipes/categorySeverity-pipe';
import { PrioritySeverityPipe } from '../../../shared/pipes/prioritySeverity-pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FilterSelect,
    ButtonModule,
    TableModule,
    CommonModule,
    FormsModule,
    Checkbox,
    TagModule,
    PriorityPipe,
    ConfirmDialogModule,
    TaskDialog,
    CategorySeverityPipe,
    PrioritySeverityPipe
],
  providers: [ConfirmationService],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskList {
  private taskService = inject(TaskService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private confirmationService = inject(ConfirmationService);
  taskDialog = viewChild.required(TaskDialog);

  tasks = this.taskService.filteredTasks;
  currentFilter = this.taskService.filter;

  columns = [
    { field: 'title', header: 'Название' },
    { field: 'category', header: 'Категория' },
    { field: 'priority', header: 'Приоритет' },
    { field: 'createdAt', header: 'Дата создания' }
  ];

  filterOptions = computed(() => [
    { value: 'all', label: 'Все' },
    ...Object.entries(TaskCategory).map(([key, value]) => ({
      value: key.toLowerCase(),
      label: value
    }))
  ]);

  constructor() {
    effect(() => {
      const category = this.route.snapshot.params['category'];
      
      if (category) {
        const filter = Object.values(TaskCategory)
          .find(value => value.toLowerCase() === category.toLowerCase());
        
        if (filter && filter !== this.currentFilter()) {
          this.taskService.setFilter(filter);
        }
      } else if (this.currentFilter() !== 'all') {
        this.taskService.setFilter('all');
      }
    });
  }

  handleFilterChange(filter: TaskFilter) {
    this.taskService.setFilter(filter);
    this.updateRoute(filter);
  }

  private updateRoute(filter: TaskFilter) {
    if (filter === 'all') {
      this.router.navigate(['/tasks']);
    } else {
      this.router.navigate(['/categories', filter.toLowerCase()]);
    }
  }

  toggleTaskStatus(id: string) {
    this.taskService.toggleComplete(id);
  }

  openNewTaskDialog() {
    this.taskDialog().open();
  }

  openEditTaskDialog(task: Task) {
    this.taskDialog().open(task);
  }

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить эту задачу?',
      header: 'Подтверждение удаления',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.taskService.deleteTask(id);
      }
    });
  }
}
