import React from "react";
import {connect} from 'react-redux';
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {clonePiece, cloneState} from "../util/clone-handler";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const GridPlayerComponent = ({state}) => {

  /* PLAYERGRID */

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

  /* PIECEFLOW */

  const piecesRender = state.piecesFlow.filter((e, i) => i > 0 && i < 4);

  let previewRender = [];

  previewRender.push(Array(4 + 1).fill(PIECES_NUM.wall));
  for (let i = 0; i < 3; i++) {
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), PIECES_NUM.wall]);
    previewRender.push(Array(4 + 1).fill(PIECES_NUM.wall));
  }

  for (let i = 0; i < piecesRender.length; i++) {
    const pieceCp = clonePiece(piecesRender[i]);
    pieceCp.pos.x = 0;
    pieceCp.pos.y = 1 + i * 5;
    previewRender = placePiece(previewRender, pieceCp);
  }

  previewRender.forEach((l, i) => gridRender[i + 3].push(...l));

  return <div className={"column"}>
    <div>
      <div className={"column"}>
        {gridRender.map((line, i) => i > 2 &&
          <div key={i} className={"row"}>
            {line.map((el, j) => <div key={j} className={"casePlayer + color" + el}/>)}
          </div>
        )}
      </div>
    </div>
    <div className={"row center color0"}>
      <p className={"pad color0"}>
        YOU!{playerState.isMaster && "(Master)"}{playerState.hasLoose && "(loose)"}{playerState.hasWin && "(Win)"}
      </p>
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
