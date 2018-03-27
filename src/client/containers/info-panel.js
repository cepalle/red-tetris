import React from "react";
import {connect} from 'react-redux';
import {emitQuitGame, sendStartGame, updateRoomPlayerName} from "../actions/action-creators";
import {InfoPanelComponent} from "../components/info-panel-component";

const mapStateToProps = state => {
  return {
    error: Object.assign({}, state.error),
    animate: state.animate,
    master: state.playerStates.find(e => e.playerName === state.playerName).master,
    playerName: state.playerName,
    roomName: state.roomName,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButton: () => dispatch(sendStartGame()),
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
