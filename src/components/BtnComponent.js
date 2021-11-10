import React from "react";

function BtnComponent(props) {
  return (
    <div>
      {props.isTimerActive === false ? (
        <button
          className="stopwatch-btn stopwatch-btn-start"
          onClick={props.onStartlCick}
        >
          Start
        </button>
      ) : (
        <button
          className="stopwatch-btn stopwatch-btn-stop"
          onClick={props.onStopClick}
        >
          Stop
        </button>
      )}
      <button
        className="stopwatch-btn stopwatch-btn-wait"
        onClick={props.onWaitClick}
      >
        Wait
      </button>
      <button
        className="stopwatch-btn stopwatch-btn-reset"
        onClick={props.onResetClick}
      >
        Reset
      </button>
    </div>
  );
}

export default BtnComponent;
