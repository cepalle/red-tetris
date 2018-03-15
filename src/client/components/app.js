import React from "react";
import {FlowTest} from "./flow-test";
import {GridPlayer} from "./grid-player"
import {store} from "../redux/store"
import {Error} from "./error";
import {Opponent} from "./opponent";

const App = () =>
  <div>
    <Error/>
    <GridPlayer/>
    <FlowTest/>
    <p>Room name: {store.getState().roomName}</p>
    <Opponent/>
  </div>
;

export default App;
