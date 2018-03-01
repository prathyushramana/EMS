import {Pipe ,PipeTransform} from '@angular/core';
@Pipe({
  name:'AutoGridPipe',//name will be used in the page
  pure: false
})
export class AutoGridPipe implements PipeTransform
{
  //Sort,Dir ... will be passed through the component
  transform(array: any[],SortBy: string,Dir : number)
  {
    array.sort((a: any, b: any) =>
    {
      if (a[SortBy] > b[SortBy]) {
        return 1 * Dir;//we switch ascending and descending by multiply x -1
      }
      if (a[SortBy] < b[SortBy]) {
        return -1 * Dir;//we switch ascending and descending by multiply x -1
      }
      return 0;
    });
    return array;
  }
} 