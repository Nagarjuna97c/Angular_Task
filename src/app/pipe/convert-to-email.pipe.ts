import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToMailFormat',
})
export class ConvertToMailFormat implements PipeTransform {
  transform(value: string) {
    return value.toLowerCase();
  }
}
