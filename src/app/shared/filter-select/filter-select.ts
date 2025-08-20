import { Component, effect, EventEmitter, input, Input, output, Output } from '@angular/core';
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
  selectedFilter = input<TaskFilter>('all');
  filterChange = output<TaskFilter>();

  protected filters: { label: string, value: TaskFilter }[] = [
    { label: 'Все задачи', value: 'all' },
    { label: 'Учёба', value: TaskCategory.STUDIES },
    { label: 'Работа', value: TaskCategory.WORK },
    { label: 'Дом', value: TaskCategory.HOME}
  ];

  onFilterChange(newFilter: TaskFilter) {
    this.filterChange.emit(newFilter);
  }
}
