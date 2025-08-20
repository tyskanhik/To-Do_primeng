import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TaskCategory, TaskFilter } from '../../core/models/task.model';
import { Logger } from '../../core/decorators/logger.decorator';

@Component({
  selector: 'app-filter-select',
  standalone: true,
  imports: [ FormsModule, SelectModule ],
  templateUrl: './filter-select.html',
  styleUrl: './filter-select.scss'
})
export class FilterSelect {
  @Input() selectedFilter: TaskFilter = 'all';
  @Output() filterChange = new EventEmitter<TaskFilter>();

  protected filters: { label: string, value: TaskFilter }[] = [
    { label: 'Все задачи', value: 'all' },
    { label: 'Учёба', value: TaskCategory.STUDIES },
    { label: 'Работа', value: TaskCategory.WORK },
    { label: 'Дом', value: TaskCategory.HOME}
  ];

  onFilterChange() {
    this.filterChange.emit(this.selectedFilter)
  }
}
