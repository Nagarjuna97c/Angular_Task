import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToNameFormat',
})
export class ConvertToNameFormat implements PipeTransform {
  transform(value: string) {
    const array = value.split(' ');
    let name = '';
    array.forEach((each) => {
      name += each[0].toUpperCase() + each.slice(1).toLowerCase() + ' ';
    });
    console.log(name);
    return name;
  }
}
