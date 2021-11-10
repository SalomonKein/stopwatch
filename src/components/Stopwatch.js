import React, {useState, useEffect} from "react";
import DisplayComponent from "./DisplayComponent";
import BtnComponent from "./BtnComponent";
import "../App.css";

let lastClick = 0;

function Stopwatch() {
  const [time, setTime] = useState({ms: 0, s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  const [isTimerActive, setTimerActive] = useState(false);
  const [isReset, setReset] = useState(false);

  useEffect(() => {
    clearInterval(interv);
    setReset(false);
    if (isTimerActive) {
        onStartClick();
    }
  }, [isReset]);

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

  return (
    <div className="main-section">
      <div className="clock-holder">
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
      </div>
    </div>
  );
}

export default Stopwatch;
