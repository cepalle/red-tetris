import React from "react";
import {connect} from 'react-redux';
import {GridPlayerComponent} from "../components/grid-player-component";

const mapStateToProps = state => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName,
    piecesFlow: state.piecesFlow
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
