import React from "react";
import {useEffect, useState} from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

let lastClick = 0;

function Stopwatch() {
  const [time, setTime] = useState({ms: 0, s: 50, m: 59, h: 0});
  const [isTimerActive, setTimerActive] = useState(false);
  const [status, setStatus] = useState("stop");

  let updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(10)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "start") {
          run();
        }
        if (status === "reset") {
          setStatus("stop");
          onStartClick();
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);

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

  const onStartClick = () => {
    setStatus("start");
    setTimerActive(true);
  };

  const onStopClick = () => {
    setStatus("stop");
    setTimerActive(false);
    setTime({ms: 0, s: 0, m: 0, h: 0});
  };

  const onResetClick = () => {
    setStatus("reset");
    setTimerActive(false);
    setTime({ms: 0, s: 0, m: 0, h: 0});
  };

  const onWaitClick = () => {
    let d = new Date();
    let t = d.getTime();
    if (t - lastClick < 300) {
      setStatus("wait");
      setTimerActive(false);
    }
    lastClick = t;
  };

  return (
    <div className="stopwatch">
      <DisplayComponent time={time} />
      <BtnComponent
        isTimerActive={isTimerActive}
        onWaitClick={onWaitClick}
        onResetClick={onResetClick}
        onStopClick={onStopClick}
        onStartClick={onStartClick}
      />
    </div>
  );
}

export default Stopwatch;
