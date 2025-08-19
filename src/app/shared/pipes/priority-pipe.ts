import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../core/models/task.model';

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  transform(value: TaskPriority): string {
    switch(value) {
      case 'low': return 'низкий'
      case 'medium': return 'средний'
      case 'high': return 'высокий'
      default: return value
    }
  }
}
