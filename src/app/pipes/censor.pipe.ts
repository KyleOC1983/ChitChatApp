import { Pipe, PipeTransform } from '@angular/core';
import {banned} from './banned-words';
import * as Filter from "bad-words";
@Pipe({
  name: 'censor'
})

export class CensorPipe implements PipeTransform {
filter = new Filter(); 

  transform(text: string, censor: boolean): string {
    this.filter.addWords(...banned)
    if(!censor){
      return text;
    }
    
    return this.filter.clean(text);
  }

}
