import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow, emitStartPlaying} from "../util/socket-handler"
import {movePiece} from "../actions/action-creators";
import {PIECES_MOVE} from "../../common/pieces";
import {getColorNum} from "../util/css-handler";
import {store} from "../middlewares/store";

const ButtonTestComponent = ({
                               line,
                               onClickButtonFlow, onClickButtonRotRight,
                               onClickButtonRotLeft, onClickButtonMoveDown,
                               onClickButtonMoveLeft, onClickButtonMoveRight,
                               onClickButtonStartGame,
                             }) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"case color" + getColorNum(el)}/>
      )}
    </div>
    <button onClick={() => onClickButtonFlow()}>
      GenFlow
    </button>

    <button onClick={() => onClickButtonStartGame()}>
      StartGame
    </button>

    <button onClick={() => onClickButtonRotRight()}>
      RotRight
    </button>
    <button onClick={() => onClickButtonRotLeft()}>
      RotLeft
    </button>
    <button onClick={() => onClickButtonMoveDown()}>
      MoveDown
    </button>
    <button onClick={() => onClickButtonMoveLeft()}>
      MoveLeft
    </button>
    <button onClick={() => onClickButtonMoveRight()}>
      MoveRight
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
    onClickButtonFlow: () => emitGenFlow(store.getState().roomName),
    onClickButtonStartGame: () => {
      console.log("button start playing");
      emitStartPlaying(store.getState().roomName);
    },
    onClickButtonRotRight: () => dispatch(movePiece(PIECES_MOVE.ROT_RIGHT)),
    onClickButtonRotLeft: () => dispatch(movePiece(PIECES_MOVE.ROT_LEFT)),
    onClickButtonMoveDown: () => dispatch(movePiece(PIECES_MOVE.DOWN)),
    onClickButtonMoveLeft: () => dispatch(movePiece(PIECES_MOVE.LEFT)),
    onClickButtonMoveRight: () => dispatch(movePiece(PIECES_MOVE.RIGHT)),
  }
};

const ButtonTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonTestComponent);

export {ButtonTest};
