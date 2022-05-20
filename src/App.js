import React from "react";
import classes from "./App.module.css";
import Wallet from "./Wallet";
import PlaceBets from "./PlaceBets";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(1000);

  return (
    <React.Fragment>
      <div className={classes.main}>
        <div className={classes.header}>
          <h1>CRYPTO CRASH</h1>
          <Wallet balance={balance} />
        </div>
        <div className={classes.bet_controls}>
          <PlaceBets balance={balance} setBalance={setBalance} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
