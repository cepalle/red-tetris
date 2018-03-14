import React from "react";
import {FlowTest} from "./flow-test";
import {GridPlayer} from "./grid-player"
import {store} from "../redux/store"

const App = () =>
  <div>
    <GridPlayer/>
    <p>part flow:</p>
    <FlowTest/>
    <p>Player name: {store.getState().playerName}</p>
    <p>Room name: {store.getState().roomName}</p>
  </div>
;

export default App;
