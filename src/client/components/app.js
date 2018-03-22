import React from "react";
import {ButtonStart} from "../containers/button-start";
import {GridPlayer} from "../containers/grid-player"
import {store} from "../middlewares/store"
import {Error} from "../containers/error";
import {Opponents} from "../containers/opponents";
import {PreviewFlow} from "../containers/preview-flow"
import mp3 from '../asserts/Original_Tetris_theme.mp3'

const App = () =>
  <div className={"column"}>
    <div className={"row center wrap"}>
      <div className={"column width_info end"}>
        <div className={"row center"}>
          <Error/>
        </div>

        <div className={"row center"}>
          <ButtonStart/>
        </div>

        <div className={"row center"}>
          {store.getState().roomName && "Room name: " + store.getState().roomName}
        </div>

        <div className={"row center"}>
          {store.getState().playerName && "Your name: " + store.getState().playerName}
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
