import React, { useEffect } from "react";
import { useState } from "react";
import classes from "./RoundProgress.module.css";

function RoundProgress({
  breakPoint,
  setBreakPoint,
  settle,
  setCashOutMultiplier,
  setCollectInterval,
}) {
  let [multiplier, setMultiplier] = useState(1.0);
  let [interval, fixInterval] = useState();

  useEffect(() => {
    let breakPoint = (Math.random() * 9 + 1).toFixed(2);
    setBreakPoint(breakPoint);
    console.log(breakPoint);
    let i = 100;
    const interval = setInterval(() => {
      setMultiplier(i / 100);
      setCashOutMultiplier(i / 100);
      i++;
    }, 100);
    fixInterval(interval);
    setCollectInterval(interval);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (multiplier.toFixed(2) == breakPoint) {
    settle();
    clearInterval(interval);
  }

  return (
    <div className={classes.progress}>
      <h2>Round in Progress</h2>
      <p>{multiplier.toFixed(2)}x</p>
    </div>
  );
}

export default RoundProgress;
