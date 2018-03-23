import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {Messages} from "../containers/messages";
import {Opponents} from "../containers/opponents";
import {PreviewFlow} from "../containers/preview-flow"
import {InfoPlayer} from "../containers/info-player"
import mp3 from '../asserts/Original_Tetris_theme.mp3'

const App = () =>
  <div className={"column"}>
    <div className={"row center wrap"}>
      <div className={"column width_info end"}>
        <div className={"row center"}>
          <Messages/>
        </div>

        <div className={"row center"}>
          <InfoPlayer/>
        </div>

        <audio loop controls autoPlay src={mp3}/>
      </div>

      <div className={"row center"}>
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
