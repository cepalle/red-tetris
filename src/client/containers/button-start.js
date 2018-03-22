import React from "react";
import {connect} from 'react-redux';
import {sendStartGame} from "../actions/action-creators";

const ButtonStartComponent = ({onClickButtonStartGame}) =>
  <button onClick={() => onClickButtonStartGame()}>
    StartGame
  </button>
;

const mapDispatchToProps = dispatch => {
  return {
    onClickButtonStartGame: () => {
      console.log("button start playing");
      dispatch(sendStartGame());
    },
  }
};

const ButtonStart = connect(
  undefined,
  mapDispatchToProps
)(ButtonStartComponent);

export {ButtonStart};
