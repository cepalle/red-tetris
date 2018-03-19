import React from "react";
import {connect} from 'react-redux';
import {logger_component} from "../util/logger";
import {getColorNum} from "../util/utils"

const GridPlayerComponent = ({state}) =>
  <div className={"line center"}>
    <div>
      <div className={"grid"}>
        {state.grid.map((line, i) => i >= 4 &&
          <div key={i} className={"line"}>
            {line.map((el, j) =>
              <div key={j} className={"case color" + getColorNum(el)}/>
            )}
          </div>
        )}
      </div>
      <div className={"line center"}>
        <p>{state.playerName}{state.isMaster && "(Master)"}{state.asLoose && "(loose)"}</p>
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
