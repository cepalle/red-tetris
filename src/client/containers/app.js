import React from "react";
import {connect} from "react-redux";
import {TetrisGame} from "../components/tetris-game";
import {Choice} from "./choice";

const AppComponent = ({playerRoomNameChoose}) =>
  <div>
    {playerRoomNameChoose ?
      <TetrisGame/>
    :
      <Choice/>
    }
  </div>
;

const mapStateToProps = state => {
  return {
    playerRoomNameChoose: state.playerName && state.roomName
  };
};

const App = connect(
  mapStateToProps,
  undefined
)(AppComponent);


export default App;
