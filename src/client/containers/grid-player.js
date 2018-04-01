import React from "react";
import {connect} from 'react-redux';
import {clonePiece} from "../util/clone-handler";
import {GridPlayerComponent} from "../components/grid-player-component";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";

const mapStateToProps = state => {

  /* PLAYERGRID */

  const gridRender = [];
  const playerState = state.playerStates.find(e => e.playerName === state.playerName);
  let playerGrid = playerState.grid.map(l => l.map(e => e));
  const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
    playerState.win ? PIECES_NUM.wall_win :
      playerState.spectator ? PIECES_NUM.wall_spect : PIECES_NUM.wall);

  if (state.piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    playerGrid = placePiecePreview(playerGrid, state.piecesFlow[0]);
    playerGrid = placePiece(playerGrid, state.piecesFlow[0]);
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

  const piecesRender = state.piecesFlow.filter((e, i) => i > 0 && i < 4);
  if (state.piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    for (let i = 0; i < piecesRender.length; i++) {
      const pieceCp = clonePiece(piecesRender[i]);
      pieceCp.pos.x = 0;
      pieceCp.pos.y = 1 + i * 5;
      previewRender = placePiece(previewRender, pieceCp);
    }
  }
  previewRender.forEach((l, i) => gridRender[i + 3].push(...l));

  return {
    playerState: Object.assign({}, state.playerStates.find(e => e.playerName === state.playerName)),
    gridRender: gridRender,
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
