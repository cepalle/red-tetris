import React from "react";
import {ButtonTest} from "../containers/button-test";
import {GridPlayer} from "../containers/grid-player"
import {store} from "../middlewares/store"
import {Error} from "../containers/error";
import {Opponent} from "../containers/opponent";
import mp3 from '../asserts/Original_Tetris_theme.mp3'

const App = () =>
  <div>
    <audio loop controls autoPlay src={mp3}/>
    <Error/>
    <GridPlayer/>
    <ButtonTest/>
    <p>Room name: {store.getState().roomName}</p>
    <Opponent/>
  </div>
;

export default App;
