import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow, emitTetrisPlacePiece} from "../socket/socket-api"
import {movePart} from "../redux/action-creators";
import {PARTS_MOVE} from "../../common/parts";

const ButtonTestComponent = ({
                           line, grid, playerName,
                           onClickButtonFlow, onClickButtonRotRight,
                           onClickButtonRotLeft, onClickButtonMoveDown,
                           onClickButtonMoveLeft, onClickButtonMoveRight,
                           onClickButtonUpdateGrid
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
    line: state.partsFlow.map(e => e),
    grid: state.playerStates.filter(
      el => el.playerName === state.playerName
    )[0].grid.map(l => l), // just for test
    playerName: state.playerName
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButtonFlow: () => emitGenFlow(),
    onClickButtonRotRight: () => dispatch(movePart(PARTS_MOVE.ROT_RIGHT)),
    onClickButtonRotLeft: () => dispatch(movePart(PARTS_MOVE.ROT_LEFT)),
    onClickButtonMoveDown: () => dispatch(movePart(PARTS_MOVE.MOVE_DOWN)),
    onClickButtonMoveLeft: () => dispatch(movePart(PARTS_MOVE.MOVE_LEFT)),
    onClickButtonMoveRight: () => dispatch(movePart(PARTS_MOVE.MOVE_RIGHT)),
    onClickButtonUpdateGrid: (grid, playerName) => emitTetrisPlacePiece(grid, playerName)
  }
};

const ButtonTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonTestComponent);

export {ButtonTest};
