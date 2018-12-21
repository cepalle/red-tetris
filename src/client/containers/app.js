import React from "react";
import {connect} from "react-redux";
import {TetrisGame} from "../components/tetris-game-component";
import {Home} from "./home";

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

const mapStateToProps = state => {
  return {
    playerRoomNameChoose: state.playerName && state.roomName,
    error: state.error,
    socketIsConnect: state.socketIsConnect
  };
};

const App = connect(
  mapStateToProps,
  undefined
)(AppComponent);

export default App;
