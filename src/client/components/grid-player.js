import React from "react";
import {add_parts_flow} from "../action-creators";
import {connect} from 'react-redux';

const Line = ({line, onClickCase}) =>
  <div className="line">
    {line.map((el, i) =>
      <div key={i} className={"part_" + el} onClick={() => onClickCase(line[i])}/>
    )}
  </div>
;

const mapStateToPropsLine = state => {
  return {
    line: state.parts_flow.map(e => e)
  }
};

const mapDispatchToPropsLine = dispatch => {
  return {
    onClickCase: e => {
      dispatch(add_parts_flow([e]));
      console.log(e);
    }
  }
};

const LineConnect = connect(
  mapStateToPropsLine,
  mapDispatchToPropsLine
)(Line);

export {LineConnect};
