import React from "react";
import {ButtonStart} from "../containers/button-test";
import {GridPlayer} from "../containers/grid-player"
import {store} from "../middlewares/store"
import {Error} from "../containers/error";
import {Opponent} from "../containers/opponent";
import {PreviewFlow} from "../containers/preview-flow"
import mp3 from '../asserts/Original_Tetris_theme.mp3'

const App = () =>
  <div className={"column"}>
    <div className={"row center"}>
      <div className={"column width_info"}>
        <Error/>
        <ButtonStart/>
        <div>
          {store.getState().roomName && "Room name: " + store.getState().roomName}
        </div>
        <div>
          {store.getState().playerName && "Your name: " + store.getState().playerName}
        </div>
        <audio loop controls autoPlay src={mp3}/>
      </div>
      <GridPlayer/>
      <div className={"width_preview center"}>
        <PreviewFlow/>
      </div>
    </div>
    <div className={"row"}>
      <Opponent/>
    </div>
  </div>
;

export default App;
