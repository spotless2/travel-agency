import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceWidthHeight'
})
export class ReplaceWidthHeightPipe implements PipeTransform {
  transform(value: string, width: number, height: number): string {
    if (!value || !width || !height) {
      return value;
    }

    return value.replace('{width}', width.toString()).replace('{height}', height.toString());
  }
}
