import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow, emitStartPlaying, emitTetrisPlacePiece} from "../socket/socket-api"
import {movePart} from "../redux/action-creators";
import {PARTS_MOVE} from "../../common/parts";

const ButtonTestComponent = ({
                           line, grid, playerName,
                           onClickButtonFlow, onClickButtonRotRight,
                           onClickButtonRotLeft, onClickButtonMoveDown,
                           onClickButtonMoveLeft, onClickButtonMoveRight,
                           onClickButtonUpdateGrid, onClickButtonStartGame,
                         }) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"part" + el}/>
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
    <button onClick={() => onClickButtonUpdateGrid(grid, playerName)}>
      updateGrid
    </button>
  </div>
;

const mapStateToProps = state => {
  return {
    line: state.piecesFlow.map(e => e),
    grid: state.playerStates.find(
      el => el.playerName === state.playerName
    ).grid.map(l => l.map(e => e)),
    playerName: state.playerName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButtonFlow: () => emitGenFlow(),
    onClickButtonStartGame: () => emitStartPlaying(),
    onClickButtonRotRight: () => dispatch(movePart(PARTS_MOVE.ROT_RIGHT)),
    onClickButtonRotLeft: () => dispatch(movePart(PARTS_MOVE.ROT_LEFT)),
    onClickButtonMoveDown: () => dispatch(movePart(PARTS_MOVE.DOWN)),
    onClickButtonMoveLeft: () => dispatch(movePart(PARTS_MOVE.LEFT)),
    onClickButtonMoveRight: () => dispatch(movePart(PARTS_MOVE.RIGHT)),
    onClickButtonUpdateGrid: (grid, playerName) => emitTetrisPlacePiece(grid, playerName)
  }
};

const ButtonTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonTestComponent);

export {ButtonTest};
