import React from "react";
import {connect} from 'react-redux';
import {
  emitQuitGame, sendStartGame, toggleAddWallLine, toggleGroundResizer,
  updateRoomPlayerName
} from "../actions/action-creators";
import {InfoPanelComponent} from "../components/info-panel-component";

const mapStateToProps = state => {
  return {
    error: state.error,
    animate: state.animate,
    master: state.playerStates.find(e => e.playerName === state.playerName).master,
    playerName: state.playerName,
    roomName: state.roomName,
    params: state.params,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButton: () => dispatch(sendStartGame()),
    onChangeGroundResizer: () => dispatch(toggleGroundResizer()),
    onChangeAddWallLine: () => dispatch(toggleAddWallLine()),
    onClickHome: () => {
      dispatch(emitQuitGame());
      dispatch(updateRoomPlayerName("", ""));
      window.location.href = "";
    }
  };
};

const InfoPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfoPanelComponent);

export {InfoPanel};
