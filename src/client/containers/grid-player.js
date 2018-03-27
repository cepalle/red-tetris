import React from "react";
import {connect} from 'react-redux';
import {clonePiece, clonePlayerState} from "../util/clone-handler";
import {GridPlayerComponent} from "../components/grid-player-component";

const mapStateToProps = state => {
  return {
    playerState: clonePlayerState(state.playerStates.find(e => e.playerName === state.playerName)),
    piecesFlow: state.piecesFlow.map(p => clonePiece(p)),
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
