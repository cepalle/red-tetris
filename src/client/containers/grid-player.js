import React from "react";
import {connect} from 'react-redux';
import {PIECES_NUM} from "../../common/pieces";
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {GRID_WIDTH} from "../../common/grid";
import {clonePiece} from "../util/clone-handler";

const mapStateToProps = state => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName,
    piecesFlow: state.piecesFlow
  }
};

const GridPlayerComponent = ({playerStates, playerName, piecesFlow}) => {
  /* PLAYERGRID */

  const gridRender = [];
  const playerState = playerStates.find(e => e.playerName === playerName);
  let playerGrid = playerState.grid.map(l => l.map(e => e));
  const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
    playerState.win ? PIECES_NUM.wall_win :
      playerState.spectator ? PIECES_NUM.wall_spect : PIECES_NUM.wall);

  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    playerGrid = placePiecePreview(playerGrid, piecesFlow[0]);
    playerGrid = placePiece(playerGrid, piecesFlow[0]);
  }

  playerGrid.forEach(l => {
    gridRender.push([wall_type, ...l, wall_type]);
  });
  gridRender[3] = Array(GRID_WIDTH + 2).fill(wall_type);
  gridRender.push(Array(GRID_WIDTH + 2).fill(wall_type));

  /* PIECEFLOW */

  let previewRender = [];

  previewRender.push(Array(4 + 1).fill(wall_type));
  for (let i = 0; i < 3; i++) {
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push(Array(4 + 1).fill(wall_type));
  }

  const piecesRender = piecesFlow.filter((e, i) => i > 0 && i < 4);
  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    for (let i = 0; i < piecesRender.length; i++) {
      const pieceCp = clonePiece(piecesRender[i]);
      pieceCp.pos.x = 0;
      pieceCp.pos.y = 1 + i * 5;
      previewRender = placePiece(previewRender, pieceCp);
    }
  }
  previewRender.forEach((l, i) => gridRender[i + 3].push(...l));

  return <div className={"column"}>
    <div>
      <div className={"column"}>
        {gridRender.map((line, i) =>
          i > 2 &&
          <div key={i} className={"row"}>
            {line.map((el, j) => <div key={j} className={"casePlayer + color" + el}/>)}
          </div>
        )}
      </div>
    </div>
    <div className={"column center"}>
      <span className={"pad font_white font_retro row center"}>
        YOU!{playerState.master && "(Master)"}{playerState.loose && "(lost)"}{playerState.win && "(Win)"}
        {playerState.spectator && "(Viewer)"}
      </span>
      <div className={"row center"}>
        <span className={"pad font_white font_retro"}>
        score:{playerState.score}
        </span>
        <span className={"pad font_white font_retro"}>
        lines completed:{playerState.lines}
        </span>
      </div>
    </div>
  </div>
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
