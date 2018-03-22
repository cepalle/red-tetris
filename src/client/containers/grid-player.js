import React from "react";
import {connect} from 'react-redux';
import {getColorNum} from "../util/css-handler";
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {cloneState} from "../util/clone-handler";

const GridPlayerComponent = ({state}) => {
  const playerState = state.playerStates.find(e => e.playerName === state.playerName);
  if (state.piecesFlow.length > 0 && !playerState.hasLoose && !playerState.hasWin) {
    playerState.grid = placePiecePreview(playerState.grid, state.piecesFlow[0]);
    playerState.grid = placePiece(playerState.grid, state.piecesFlow[0]);
  }
  return <div className={"row center"}>
    <div>
      <div className={"column pad"}>
        {playerState.grid.map((line, i) => i >= 4 &&
          <div key={i} className={"row"}>
            {line.map((el, j) => {
                let cssClass = "color" + getColorNum(el);
                cssClass += (el > 0 ? " casePiece" : " case");
                return <div key={j} className={cssClass}/>;
              }
            )}
          </div>
        )}
      </div>
      <div className={"row center"}>
        <p>{playerState.playerName}{playerState.isMaster && "(Master)"}{playerState.hasLoose && "(loose)"}{playerState.hasWin && "(Win)"}</p>
      </div>
    </div>
  </div>;
};

const mapStateToProps = state => {
  return {
    state: cloneState(state),
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
