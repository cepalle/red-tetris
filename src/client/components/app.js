import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {InfoPanel} from "../containers/info-panel";
import {Opponents} from "../containers/opponents";
import mp3 from '../assets/Original_Tetris_theme.mp3'

const App = () =>
  <div className={"column"}>
    <audio loop autoPlay src={mp3}/>
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
