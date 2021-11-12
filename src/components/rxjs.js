import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
// Build a Date object that marks the
// next minute.


function Rxjs () {
    const currentDate = new Date();
    const startOfNextMinute = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes() + 1,
    )
     
    // This could be any observable stream
    const source = interval(1000);
     
    const result = source.pipe(
      takeUntil(timer(startOfNextMinute))
    );
     
     result.subscribe(console.log);

 return (
     <div>
         so hard
     </div>
 )
}

export default Rxjs