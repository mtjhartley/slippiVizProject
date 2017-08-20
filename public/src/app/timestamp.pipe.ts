import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: number, timestamp: any): any {
    var seconds = Math.floor(timestamp % 60).toString();
    console.log(seconds)
    var minutes = Math.floor(timestamp/60).toString();
    console.log(minutes)
    if (seconds.length == 1){
      seconds = "0" + seconds;
    };

    return minutes + ":" + seconds;
  }

}
