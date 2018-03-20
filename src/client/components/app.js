import React from "react";
import {ButtonTestContainer} from "../containers/button-test";
import {GridPlayerContainer} from "../containers/grid-player"
import {store} from "../redux/store"
import {ErrorContainer} from "../containers/error";
import {OpponentContainer} from "../containers/opponent";

const App = () =>
  <div>
    <ErrorContainer/>
    <GridPlayerContainer/>
    <ButtonTestContainer/>
    <p>Room name: {store.getState().roomName}</p>
    <OpponentContainer/>
  </div>
;

export default App;
