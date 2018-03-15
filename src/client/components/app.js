import React from "react";
import {ButtonTest} from "./button-test";
import {GridPlayer} from "./grid-player"
import {store} from "../redux/store"
import {Error} from "./error";
import {Opponent} from "./opponent";

const App = () =>
  <div>
    <Error/>
    <GridPlayer/>
    <ButtonTest/>
    <p>Room name: {store.getState().roomName}</p>
    <Opponent/>
  </div>
;

export default App;
