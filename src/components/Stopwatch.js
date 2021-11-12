import React, {useState, useEffect} from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import "../App.css";
import { interval, from, timer } from "rxjs";
import { map, filter, mergeMap, delay, takeUntil } from "rxjs/operators"


let lastClick = 0;

function Stopwatch() {
  const [time, setTime] = useState({ms: 0, s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  const [isTimerActive, setTimerActive] = useState(false);
  const [isReset, setReset] = useState(false);

  const [curentNumber, setCurentNumber] = useState(0)

  let arrTime = Object.values(time).reverse()
  let squeredNumbers

  useEffect(() => {
    clearInterval(interv);
    setReset(false);
    if (isTimerActive) {
        onStartClick();
    }
    let numbersObservable = from(arrTime);
    squeredNumbers = numbersObservable.pipe(  
    map(val =>console.log(val, "val"))) 
    let subscription = squeredNumbers.subscribe(result => {
      setCurentNumber(result)
    })
    
    return () => subscription.unsubscribe
  }, [isReset, squeredNumbers]);

  const onStartClick = () => {
    run();
    setTimerActive(true);
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms: updatedMs, s: updatedS, m: updatedM, h: updatedH});
  };

  const onStopClick = () => {
    clearInterval(interv);
    setTimerActive(false);
    setTime({ms: 0, s: 0, m: 0, h: 0});
  };

  const onResetClick = () => {
    setTime({ms: 0, s: 0, m: 0, h: 0});
    setReset(true);
  };

  const onWaitClick = () => {
    let d = new Date();
    let t = d.getTime();
    if (t - lastClick < 300) {
      clearInterval(interv);
    }
    lastClick = t;
  };

  
   
  

  
  //   mergeMap(val => from([val]).pipe(delay(1000 * val))),
    // map(val => val * val))

    // const source = timer(1000, 1000);
    // source.subscribe(data => console.log(data));

    // timer(0, 1000).subscribe(n => console.log('timer', n));
// interval(1000).subscribe(n => console.log('interval', n));


  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time} 
          // curentNumber={curentNumber} 
          />
          <BtnComponent
            isTimerActive={isTimerActive}
            onWaitClick={onWaitClick}
            onResetClick={onResetClick}
            onStopClick={onStopClick}
            onStartClick={onStartClick}
          />
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
