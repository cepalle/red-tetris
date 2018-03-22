import React from "react";
import {connect} from 'react-redux';
import {getColorNum} from "../util/css-handler";
import {placePiece} from "../util/grid-piece-handler";

const GridPlayerComponent = ({state}) => {
  const playerState = state.playerStates.find(e => e.playerName === state.playerName);
  return <div className={"line center"}>
    <div>
      <div className={"grid"}>
        {playerState.grid.map((line, i) => i >= 4 &&
          <div key={i} className={"line"}>
            {line.map((el, j) => {
                let cssClass = "color" + getColorNum(el);
                cssClass += (el > 0 ? " casePiece" : " case");
                return <div key={j} className={cssClass}/>;
              }
            )}
          </div>
        )}
      </div>
      <div className={"line center"}>
        <p>{playerState.playerName}{playerState.isMaster && "(Master)"}{playerState.hasLoose && "(loose)"}{playerState.hasWin && "(Win)"}</p>
      </div>
    </div>
  </div>;
};

const mapStateToProps = state => {
  return {
    state: placePiece(state),
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
