import React from "react";
import {addPartsFlow} from "../action-creators";
import {connect} from 'react-redux';

const GridPlayerComponent = ({grid, onClickCase}) =>
  <div className={"grid"}>
    {grid.map((line, i) =>
      <div key={i} className={"line"}>
        {line.map((el, j) =>
          <div key={j} className={"part_" + el} onClick={() => onClickCase(el)}/>
        )}
      </div>
    )}
  </div>
;

const mapStateToProps = state => {
  return {
    grid: state.grids[0].grid.map(l => l.map(el => el))
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onClickCase: e => {
      dispatch(addPartsFlow([e]));
      console.log(e);
    }
  }
};

const GridPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridPlayerComponent);

export {GridPlayer};
