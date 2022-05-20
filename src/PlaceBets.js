import React, { useState } from "react";
import RoundProgress from "./RoundProgress";
import classes from "./PlaceBets.module.css";
import { Button } from "@mui/material";

function PlaceBets({ balance, setBalance }) {
  const [multiplier, setMultiplier] = useState(1);
  const [cashoutMultiplier, setCashOutMultiplier] = useState(1);
  const [betAmount, setBetAmount] = useState(0);
  const [error, setError] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [breakPoint, setBreakPoint] = useState(0);
  const [displayResults, setDisplayResults] = useState(false);
  const [collectInterval, setCollectInterval] = useState();

  const calculateBalance = (breakPoint, balance, betAmount, setBalance) => {
    if (breakPoint >= multiplier) {
      let winAmount = multiplier * betAmount;
      let newBalance = balance + winAmount;
      setBalance(newBalance);
    }
    setShowProgress(false);
    setDisplayResults(true);
  };

  const runGame = () => {
    setDisplayResults(false);
    if (betAmount > balance) {
      setError("Not enough balance");
    } else {
      let newBalance = balance - betAmount;
      setBalance(newBalance);
      setShowProgress(true);
    }
  };

  const cashOut = () => {
    let winAmount = cashoutMultiplier * betAmount;
    let newBalance = balance + winAmount;
    setBalance(newBalance);
    clearInterval(collectInterval);
    setShowProgress(false);
  };

  const settle = () => {
    calculateBalance(breakPoint, balance, betAmount, setBalance);
  };

  return (
    <div className={classes.main}>
      <div className={classes.controls}>
        <div className={classes.multiplier}>
          <p>Select Auto Multiplier {parseFloat(multiplier).toFixed(2)}x</p>
          <input
            type="range"
            min="1"
            max="10"
            step="0.01"
            value={multiplier}
            onChange={(event) => {
              setMultiplier(event.target.value);
            }}
          />
        </div>
        <div className={classes.bets}>
          <p>Place Bet</p>
          <input
            type="number"
            min="0"
            max={balance}
            step="10"
            value={betAmount}
            onChange={(event) => {
              setBetAmount(event.target.value);
            }}
          />
        </div>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            onClick={runGame}
            disabled={betAmount == 0}
          >
            Run
          </Button>
          <Button
            variant="contained"
            onClick={cashOut}
            disabled={!showProgress}
          >
            Cash Out
          </Button>
        </div>
        <div>
          <p>{error}</p>
        </div>
      </div>
      {showProgress && (
        <RoundProgress
          breakPoint={breakPoint}
          setBreakPoint={setBreakPoint}
          settle={settle}
          setCashOutMultiplier={setCashOutMultiplier}
          setCollectInterval={setCollectInterval}
        />
      )}
      {displayResults && (
        <div className={classes.results}>
          <p>Crashed at {breakPoint}</p>
        </div>
      )}
    </div>
  );
}

export default PlaceBets;
