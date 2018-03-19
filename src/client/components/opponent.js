import React from "react";
import {connect} from 'react-redux';
import {clonePlayerStates, getColorNum} from "../util/utils"

const OpponentComponent = ({states}) =>
  <div className={"line"}>
    {states.map((playerState, k) =>
      <div key={k}>
        <div className={"grid"}>
          {playerState.grid.map((line, i) => i >= 4 &&
            <div key={i} className={"line"}>
              {line.map((el, j) =>
                <div key={j} className={"case color" + getColorNum(el)}/>
              )}
            </div>
          )}
        </div>
        <div className={"line center"}>
          <p>{playerState.playerName}{playerState.isMaster && "(Master)"}{playerState.hasLoose && "(loose)"}{playerState.hasWin && "(Win)"}</p>
        </div>
      </div>
    )}
  </div>
;

const mapStateToProps = state => {
  return {states: clonePlayerStates(state.playerStates).filter(el => el.playerName !== state.playerName)};
};

const Opponent = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponent};
