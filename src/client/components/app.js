import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {InfoPanel} from "../containers/info-panel";
import {Opponents} from "../containers/opponents";

const App = () =>
  <div className={"column"}>
    <div className={"row center"}>
      <div className={"row color8 pad"}>
        <InfoPanel/>
        <GridPlayer/>
      </div>
    </div>
    <Opponents/>
  </div>
;

export default App;
