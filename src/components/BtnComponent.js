import React from "react";

function BtnComponent(props) {
  return (
    <div>
      {props.status === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={props.start}
        >
          Start
        </button>
      ) : (
        <button
          className="stopwatch-btn stopwatch-btn-red"
          onClick={props.stop}
        >
          Stop
        </button>
      )}
      <button
        className="stopwatch-btn stopwatch-btn-gre"
        onClick={props.wait}
      >
        Wait
      </button>
      <button className="stopwatch-btn stopwatch-btn-yel" onClick={props.reset}>
        Reset
      </button>
    </div>
  );
}

export default BtnComponent;
