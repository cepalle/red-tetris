import React from "react";
import {add_parts_flow} from "../action-creators";
import {connect} from 'react-redux';

const Flow = ({line, onClickCase}) =>
  <div className="line">
    {line.map((el, i) =>
      <div key={i} className={"part_" + el} onClick={() => onClickCase(line[i])}/>
    )}
  </div>
;

const mapStateToProps = state => {
  return {
    line: state.parts_flow.map(e => e)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickCase: e => {
      dispatch(add_parts_flow([e]));
      console.log(e);
    }
  }
};

const FlowTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flow);

export {FlowTest};
