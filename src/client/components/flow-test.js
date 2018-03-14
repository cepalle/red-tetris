import React from "react";
import {addPartsFlow} from "../action-creators";
import {connect} from 'react-redux';
import {genFlow} from "../socketAPI"

const Flow = ({line, onClickCase, onClickButon}) =>
  <div>
    <div className="line">
      {line.map((el, i) =>
        <div key={i} className={"part_" + el} onClick={() => onClickCase(line[i])}/>
      )}
    </div>
    <div onClick={() => onClickButon()}>
      Buton flow socket.io
    </div>
  </div>
;

const mapStateToProps = state => {
  return {
    line: state.partsFlow.map(e => e)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickCase: e => {
      dispatch(addPartsFlow([e]));
      console.log(e);
    },
    onClickButon: () => genFlow()
  }
};

const FlowTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flow);

export {FlowTest};
