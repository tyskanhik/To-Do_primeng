import { Component, inject, output } from '@angular/core';
import { TaskForm } from "../task-form/task-form";
import { DialogModule } from 'primeng/dialog';
import { TaskService } from '../../core/services/task-service';
import { NewTask, Task } from '../../core/models/task.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [DialogModule, TaskForm, ButtonModule],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss'
})
export class TaskDialog {
  private taskService = inject(TaskService);
  
  visible = false;
  editingTask: Task | null = null;

  dialogClosed = output<void>();

  open(task?: Task): void {
    this.editingTask = task || null;
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.dialogClosed.emit();
  }

  onHide(): void {
    this.editingTask = null;
    this.dialogClosed.emit();
  }

  handleSubmit(taskData: NewTask): void {
    try {
      if (this.editingTask) {
        this.taskService.updateTask(this.editingTask.id, taskData);
      } else {
        this.taskService.addTask(taskData);
      }
      this.close();
    } catch (error) {
      console.error('Ошибка при сохранении задачи:', error);
    }
  }
}