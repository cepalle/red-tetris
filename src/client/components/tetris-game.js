import React from "react";
import {InfoPanel} from "../containers/info-panel";
import {GridPlayer} from "../containers/grid-player";
import {Opponents} from "../containers/opponents";

const TetrisGame = () =>
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

export {TetrisGame};
