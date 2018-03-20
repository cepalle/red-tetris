import React from "react";
import {connect} from 'react-redux';
import {movePiece, sendStartGame} from "../actions/action-creators";
import {PIECES_MOVE} from "../../common/pieces";
import {getColorNum} from "../util/css-handler";

const ButtonTestComponent = ({
                               line,
                               onClickButtonRotRight,
                               onClickButtonRotLeft,
                               onClickButtonStartGame,
                             }) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"case color" + getColorNum(el)}/>
      )}
    </div>

    <button onClick={() => onClickButtonStartGame()}>
      StartGame
    </button>

    <button onClick={() => onClickButtonRotRight()}>
      RotRight
    </button>
    <button onClick={() => onClickButtonRotLeft()}>
      RotLeft
    </button>
  </div>
;

const mapStateToProps = state => {
  return {
    line: state.piecesFlow.map(e => e.num),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButtonStartGame: () => {
      console.log("button start playing");
      dispatch(sendStartGame());
    },
    onClickButtonRotRight: () => dispatch(movePiece(PIECES_MOVE.ROT_RIGHT)),
    onClickButtonRotLeft: () => dispatch(movePiece(PIECES_MOVE.ROT_LEFT)),
  }
};

const ButtonTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonTestComponent);

export {ButtonTest};
