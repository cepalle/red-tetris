import React from "react";
import {connect} from 'react-redux';
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {cloneState} from "../util/clone-handler";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const GridPlayerComponent = ({state}) => {
  const playerState = state.playerStates.find(e => e.playerName === state.playerName);
  if (state.piecesFlow.length > 0 && !playerState.hasLoose && !playerState.hasWin) {
    playerState.grid = placePiecePreview(playerState.grid, state.piecesFlow[0]);
    playerState.grid = placePiece(playerState.grid, state.piecesFlow[0]);
  }

  const gridRender = [];
  playerState.grid.forEach(l => {
    gridRender.push([PIECES_NUM.wall, ...l, PIECES_NUM.wall]);

  });
  gridRender[3] = Array(GRID_WIDTH + 2).fill(PIECES_NUM.wall);
  gridRender.push(Array(GRID_WIDTH + 2).fill(PIECES_NUM.wall));

  return <div className={"column center"}>
    <div>
      <div className={"column pad"}>
        {gridRender.map((line, i) => i > 2 &&
          <div key={i} className={"row"}>
            {line.map((el, j) => <div key={j} className={"casePlayer + color" + el}/>)}
          </div>
        )}
      </div>
    </div>
    <div className={"row center"}>
      <p>YOU!{playerState.isMaster && "(Master)"}{playerState.hasLoose && "(loose)"}{playerState.hasWin && "(Win)"}</p>
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
