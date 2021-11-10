import React, {useState} from "react";
import DisplayComponent from "./components/DisplayComponent";
import BtnComponent from "./components/BtnComponent";
import "./App.css";

let lastClick = 0;

function App() {
  const [time, setTime] = useState({ms: 0, s: 0, m: 0, h: 0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  
  const start = () => {
    run();
    setStatus(1);
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
  


  const stop = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms: 0, s: 0, m: 0, h: 0});
  };

  const reset = () => {
    clearInterval(interv);
    setTime({ms: 0, s: 0, m: 0, h: 0});
    // start()
    }

  //   const end  =  new Promise((res) => setTimeout(() => {
  //     clearInterval(interv); 
  //     setTime({ms: 0, s: 0, m: 0, h: 0});
  //     res()}, 1000) )
  // end.then(()  => setInterv(setInterval(run, 10)))

 

  const wait = () => {
    let d = new Date();
        let t = d.getTime();
        if(t - lastClick < 300) {
          clearInterval(interv);
          setStatus(0); 
        }       
        lastClick = t;
      
  }

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time} />
          <BtnComponent
            status={status}
            wait={wait}
            reset={reset}
            stop={stop}
            start={start}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
