import React from "react";
import {GridPlayer} from "../containers/grid-player"
import {Messages} from "../containers/messages";
import {Opponents} from "../containers/opponents";
import {PreviewFlow} from "../containers/preview-flow"
import {InfoPlayer} from "../containers/info-player"
import mp3 from '../assets/tetris_remix.mp3'

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
    <div className={"row center wrap"}>
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
