import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../core/models/task.model';

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  transform(value: TaskPriority): string {
    switch(value) {
      case TaskPriority.LOW: return 'низкий'
      case TaskPriority.MEDIUM: return 'средний'
      case TaskPriority.HIGHT: return 'высокий'
      default: return value
    }
  }
}
