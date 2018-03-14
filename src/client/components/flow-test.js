import React from "react";
import {add_parts_flow} from "../action-creators";
import {connect} from 'react-redux';
import {gen_flow} from "../socketAPI"

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
    line: state.parts_flow.map(e => e)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickCase: e => {
      dispatch(add_parts_flow([e]));
      console.log(e);
    },
    onClickButon: () => gen_flow()
  }
};

const FlowTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(Flow);

export {FlowTest};
