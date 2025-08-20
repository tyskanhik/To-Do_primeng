import { Component, effect, EventEmitter, inject, input, Input, output, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Task, TaskCategory, TaskPriority } from '../../core/models/task.model';
import { NgClass } from '@angular/common';
import { ToFormControls } from '../../core/models/toFormControls';
import { CheckboxModule } from 'primeng/checkbox';


interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  severity?: string;
}

interface ITaskForm extends ToFormControls<Omit<Task, 'id' | 'createdAt'>>{}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    CheckboxModule,
    NgClass
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  task = input<Task | null>(null);
  submitText = input('Создать');
  showCompletion = input(false);

  submitForm = output<Omit<Task, 'id' | 'createdAt'>>();
  cancel = output<void>();

  constructor() {
    effect(() => {
      const taskValue = this.task();
      if(taskValue) this.form.patchValue(taskValue);
    })
  }

  form = new FormGroup<ITaskForm>({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl(TaskCategory.HOME),
    priority: new FormControl(TaskPriority.LOW),
    completed: new FormControl(false)
  })

  categoryOptions: SelectOption[] = [
    { label: TaskCategory.STUDIES, value: TaskCategory.STUDIES, icon: 'pi pi-book', severity: 'info' },
    { label: TaskCategory.WORK, value: TaskCategory.WORK, icon: 'pi pi-briefcase', severity: 'warning' },
    { label: TaskCategory.HOME, value: TaskCategory.HOME, icon: 'pi pi-home', severity: 'success' }
  ];

  priorityOptions: SelectOption[] = [
    { label: 'Низкий', value: TaskPriority.LOW, icon: 'pi pi-arrow-down', severity: 'success' },
    { label: 'Средний', value: TaskPriority.MEDIUM, icon: 'pi pi-minus', severity: 'warning' },
    { label: 'Высокий', value: TaskPriority.HIGHT, icon: 'pi pi-arrow-up', severity: 'danger' }
  ];

  get titleControl() {
    return this.form.get('title')
  }

  onSubmit() {
    if (this.form.valid && this.form.value.title) {
      this.submitForm.emit({
        title: this.form.value.title,
        category: this.form.value.category || TaskCategory.WORK,
        priority: this.form.value.priority || TaskPriority.LOW,
        completed: this.form.value.completed! || false
      })
    }
  }
}