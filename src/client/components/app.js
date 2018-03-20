import React from "react";
import {ButtonTest} from "../containers/button-test";
import {GridPlayer} from "../containers/grid-player"
import {store} from "../middlewares/store"
import {Error} from "../containers/error";
import {Opponent} from "../containers/opponent";

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
