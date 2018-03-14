import React from "react";
import {addPartsFlow} from "../redux/action-creators";
import {connect} from 'react-redux';
import {logger_component} from "../logger";

const GridPlayerComponent = ({state, onClickCase}) =>
  <div className={"gridPlayer"}>
    <div className={"grid"}>
      {state.grid.map((line, i) =>
        <div key={i} className={"line"}>
          {line.map((el, j) =>
            <div key={j} className={"part" + el} onClick={() => onClickCase(el)}/>
          )}
        </div>
      )}
    </div>
  </div>
;

const mapStateToProps = state => {
  let playerStates = state.playerStates;
  let playerName = state.playerName;
  for (let i = 0; i < playerStates.length; i++) {
    if (playerName === playerStates[i].playerName) {
      return {
        state: Object.assign({}, playerStates[i], {grid: playerStates[i].grid.map(l => l.map(e => e))})
      }
    }
  }
  logger_component(["error don't find playerName in playerStates"]);
  return {state: undefined};
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
