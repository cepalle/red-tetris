import React from "react";
import {connect} from 'react-redux';
import {logger_component} from "../logger";

const GridPlayerComponent = ({state}) =>
  <div className={"line center"}>
    <div>
      <div className={"grid"}>
        {state.grid.map((line, i) =>
          <div key={i} className={"line"}>
            {line.map((el, j) =>
              <div key={j} className={"part" + el}/>
            )}
          </div>
        )}
      </div>
      <div className={"line center"}>
        <p>{state.playerName}{state.isMaster && "(Master)"}</p>
      </div>
    </div>
  </div>
;

const mapStateToProps = state => {
  let playerState = state.playerStates.find(el => el.playerName === state.playerName);
  if (playerState) {
    return {state: Object.assign({}, playerState)};
  }

  logger_component(["playerName note in playerStates"]);
  return undefined;
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
