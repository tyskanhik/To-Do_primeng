import { Pipe, PipeTransform } from '@angular/core';
import { TaskCategory } from '../../core/models/task.model';

@Pipe({
  name: 'categorySeverity',
  standalone: true
})
export class CategorySeverityPipe implements PipeTransform {

  transform(category: TaskCategory): string {
    switch(category) {
      case TaskCategory.HOME: return 'success'
      case TaskCategory.STUDIES: return 'help'
      case TaskCategory.WORK: return 'info'
      default: return 'primary'
    }
  }
}
