import React from "react";
import {connect} from 'react-redux';
import {OpponentComponent} from "../components/opponents-component";

const mapStateToProps = state => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName
  };
};

const Opponents = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponents};
