import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {Messages} from "../containers/messages";
import {Opponents} from "../containers/opponents";
import {PreviewFlow} from "../containers/preview-flow"
import {InfoPlayer} from "../containers/info-player"
import mp3 from '../assets/Original_Tetris_theme.mp3'

/*
*
      <div className={"column width_info end"}>
        <div className={"row center"}>
          <Messages/>
        </div>

        <div className={"row center"}>
          <InfoPlayer/>
        </div>

        <audio loop controls src={mp3}/>
      </div>
*
*
*
* */

const App = () =>
  <div className={"column"}>
    <div className={"row center wrap"}>
      <div className={"row center"}>


        <p className={"font_retro"}>TEST</p>
        <div className={"column width_info end"}>
          <div className={"row center"}>
            <Messages/>
          </div>

          <div className={"row center"}>
            <InfoPlayer/>
          </div>

          <audio loop controls src={mp3}/>
        </div>




        <GridPlayer/>
        <div className={"width_preview center"}>
          <PreviewFlow/>
        </div>
      </div>
      <Opponents/>
    </div>
  </div>
;

export default App;
