import React from "react";
import {connect} from "react-redux";
import {TetrisGame} from "./tetris-game-component";
import {Home} from "../containers/home";
import {Route, Switch} from "react-router";

const AppComponent = () => {
  return (
    <Switch>
      <Route path="/#:room[:player_name:]" component={TetrisGame}/>
      <Route path="/offline" component={() => (
        <div className={"row center font_white"}>
          <p className={"color8 pad"}>
            The server is offline, see the README file to run it locally
          </p>
        </div>
      )}/>
      <Route component={Home}/>
    </Switch>
  );
};

/*
const mapStateToProps = state => {
return {
  playerRoomNameChoose: state.playerName && state.roomName,
  error: state.error,
  socketIsConnect: state.socketIsConnect
};
};
*/

export default AppComponent;
