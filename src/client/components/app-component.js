import React from "react";
import {Home} from "../containers/home";
import {TetrisGame} from "./tetris-game-component";

const AppComponent = ({playerRoomNameChoose, error, socketIsConnect}) => {
  let page = <TetrisGame/>;

  if (!socketIsConnect) {
    page = <div className={"row center font_white"}>
      <p className={"color8 pad"}>
        The server is offline, see the README file to run it locally
      </p>
    </div>
  } else if (!playerRoomNameChoose || error.type === "PLAYER_ALREADY_IN_ROOM") {
    return <Home/>
  }
  return <div>
    {page}
  </div>
};

export {AppComponent};
