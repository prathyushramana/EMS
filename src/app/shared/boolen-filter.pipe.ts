import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanFilter'
})
export class BooleanFilterPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }

}
