import React from "react";
import {Home} from "../containers/home";
import {TetrisGame} from "./tetris-game-component";
import {socketIsConnect} from "../util/socket-handler";

const AppComponent = ({playerRoomNameChoose, error}) => {
  let page = <TetrisGame/>;

  if (!socketIsConnect()) {
    page = <div className={"row center font_white"}>
      <p className={"color8 pad"}>
        Sorry, an error occurs with the backend server connection ='( <br/>
        See README for run it locally
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
