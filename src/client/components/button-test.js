import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow} from "../socket/socket-api"
import {movePart} from "../redux/action-creators";
import {PARTS_MOVE_DOWN, PARTS_MOVE_LEFT, PARTS_MOVE_RIGHT, PARTS_ROT_LEFT, PARTS_ROT_RIGHT} from "../../common/parts";

const ButtonComponent = ({line, onClickButtonFlow, onClickButtonRotRight, onClickButtonRotLeft, onClickButtonMoveDown, onClickButtonMoveLeft, onClickButtonMoveRight}) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"part" + el}/>
      )}
    </div>
    <div onClick={() => onClickButtonFlow()}>
      Buton flow socket.io
    </div>

    <button onClick={() => onClickButtonRotRight()}>
      onClickButtonRotRight
    </button>
    <button onClick={() => onClickButtonRotLeft()}>
      onClickButtonRotLeft
    </button>
    <button onClick={() => onClickButtonMoveDown()}>
      onClickButtonMoveDown
    </button>
    <button onClick={() => onClickButtonMoveLeft()}>
      onClickButtonMoveLeft
    </button>
    <button onClick={() => onClickButtonMoveRight()}>
      onClickButtonMoveRight
    </button>
  </div>
;

const mapStateToProps = state => {
  return {
    line: state.partsFlow.map(e => e)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButtonFlow: () => emitGenFlow(),
    onClickButtonRotRight: () => dispatch(movePart(PARTS_ROT_RIGHT)),
    onClickButtonRotLeft: () => dispatch(movePart(PARTS_ROT_LEFT)),
    onClickButtonMoveDown: () => dispatch(movePart(PARTS_MOVE_DOWN)),
    onClickButtonMoveLeft: () => dispatch(movePart(PARTS_MOVE_LEFT)),
    onClickButtonMoveRight: () => dispatch(movePart(PARTS_MOVE_RIGHT))
  }
};

const Buton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonComponent);

export {Buton};
