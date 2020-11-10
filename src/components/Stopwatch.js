import React, { useEffect, useState, useReducer } from "react";
import moment from "moment";

const actions = {
  PLAY: "paly",
  STOP: "stop",
  RESET: "reset",
  PAUSE: "pause"
};
const theme = {
  PLAY: "#4CAF50",
  PAUSE: "#D32F2F",
  RESET: "#757575"
};

const initState = {
  play: false,
  staredtAt: "",
  endedAt: "",
  theme: theme.RESET
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.PLAY:
      const { staredtAt } = action.payload;
      return {
        ...state,
        play: true,
        staredtAt,
        theme: theme.PLAY
      };
    case actions.PAUSE:
      const { endedAt } = action.payload;
      return {
        ...state,
        play: false,
        endedAt,
        theme: theme.PAUSE
      };
    case actions.RESET:
      return { ...state, ...initState };
    default:
      return state;
  }
};

const Stopwatch = () => {
  const [timer, setTimer] = useReducer(reducer, initState);
  const [time, setTime] = useState(moment().diff(moment(), "minutes"));

  const toggleTimer = () => {
    if (timer.play) {
      setTimer({
        type: actions.PAUSE,
        payload: { endedAt: moment().format() }
      });
    } else {
      setTimer({
        type: actions.PLAY,
        payload: {
          staredtAt:
            timer.staredtAt.length > 0 ? timer.staredtAt : moment().format()
        }
      });
    }
  };

  useEffect(() => {
    if (time > 0 && timer.staredtAt.length > 0 && timer.play) {
      console.log("here");

      let ticker = setInterval(() => setTime((time) => time + 1), 1000);
      return () => clearInterval(ticker);
    } else if (time == 0 && timer.play) {
      const timeron = setInterval(() => {
        console.log("timer");
        setTime(moment().diff(moment(timer.staredtAt), "seconds"));
      }, 1000);
      return () => clearInterval(timeron);
    } else if (timer.staredtAt.length == 0) {
      setTime("0");
    }
  }, [timer]);

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: `2px solid ${timer.theme}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontSize: "2rem"
      }}
      onClick={() => toggleTimer()}
      onDoubleClick={() => setTimer({ type: actions.RESET })}
    >
      <span>{time}</span>
      <span
        style={{ color: timer.theme, fontSize: "1rem", paddingLeft: "2px" }}
      >
        s
      </span>
    </div>
  );
};

export default Stopwatch;
