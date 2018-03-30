import React from "react";
import {Home} from "../containers/home";
import {TetrisGame} from "./tetris-game-component";

const AppComponent = ({playerRoomNameChoose, error}) =>
  <div>
    {!playerRoomNameChoose || error.type === "PLAYER_ALREADY_IN_ROOM" ?
      <Home/> :
      <TetrisGame/>}
  </div>
;

export {AppComponent};
