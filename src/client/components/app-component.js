import React from "react";
import {Home} from "../containers/home";
import {TetrisGame} from "./tetris-game-component";

const AppComponent = ({playerRoomNameChoose}) =>
  <div>
    {playerRoomNameChoose ?
      <TetrisGame/> :
      <Home/>}
  </div>
;

export {AppComponent};
