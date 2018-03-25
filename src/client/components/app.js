import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {Messages} from "../containers/messages";
import {Opponents} from "../containers/opponents";
import {InfoPlayer} from "../containers/info-player"
import mp3 from '../assets/Original_Tetris_theme.mp3'

/*
        <div className={"column width_info end"}>
          <div className={"row center"}>
            <Messages/>
          </div>
          <div className={"row center"}>
            <InfoPlayer/>
          </div>
        </div>
* */

const App = () =>
  <div className={"column"}>
    <audio loop autoPlay src={mp3}/>
    <div className={"row center"}>
      <GridPlayer/>
    </div>
    <Opponents/>
  </div>
;

export default App;
