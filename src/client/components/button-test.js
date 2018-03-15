import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow} from "../socket/socket-api"
import {movePart} from "../redux/action-creators";
import {PARTS_MOVE_DOWN} from "../../common/parts";

const ButtonComponent = ({line, onClickButtonFlow, onClickButtonDown}) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"part" + el}/>
      )}
    </div>
    <div onClick={() => onClickButtonFlow()}>
      Buton flow socket.io
    </div>
    <button onClick={() => onClickButtonDown()}>
      Buton Down
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
    onClickButtonDown: () => dispatch(movePart(PARTS_MOVE_DOWN))
  }
};

const Buton = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonComponent);

export {Buton};
