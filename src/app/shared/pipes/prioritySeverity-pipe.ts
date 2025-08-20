import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriority } from '../../core/models/task.model';

@Pipe({
  name: 'prioritySeverity',
  standalone: true
})
export class PrioritySeverityPipe implements PipeTransform {

  transform(priority: TaskPriority): string {
    switch(priority) {
      case TaskPriority.LOW: return 'success'
      case TaskPriority.MEDIUM: return 'warning'
      case TaskPriority.HIGHT: return 'danger'
      default: return 'primary'
    }
  }
}
