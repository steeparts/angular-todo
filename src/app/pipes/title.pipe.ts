import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'title',
  pure: false
})
export class TitlePipe implements PipeTransform {
  transform(values: any[]): any[] {
    return values.sort((a, b) => b.title.localeCompare(a.title));
  }
}
