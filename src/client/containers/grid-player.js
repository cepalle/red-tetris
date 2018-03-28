import React from "react";
import {connect} from 'react-redux';
import {clonePiece, clonePlayerState} from "../util/clone-handler";
import {GridPlayerComponent} from "../components/grid-player-component";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";

const mapStateToProps = state => {

  /* PLAYERGRID */

  const playerState = clonePlayerState(state.playerStates.find(e => e.playerName === state.playerName));
  const piecesFlow = state.piecesFlow;

  const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
    playerState.win ? PIECES_NUM.wall_win: PIECES_NUM.wall);
  const gridRender = [];

  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win) {
    playerState.grid = placePiecePreview(playerState.grid, piecesFlow[0]);
    playerState.grid = placePiece(playerState.grid, piecesFlow[0]);
  }

  playerState.grid.forEach(l => {
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
  for (let i = 0; i < piecesRender.length; i++) {
    const pieceCp = clonePiece(piecesRender[i]);
    pieceCp.pos.x = 0;
    pieceCp.pos.y = 1 + i * 5;
    previewRender = placePiece(previewRender, pieceCp);
  }
  previewRender.forEach((l, i) => gridRender[i + 3].push(...l));

  return {
    playerState: clonePlayerState(state.playerStates.find(e => e.playerName === state.playerName)),
    gridRender: gridRender,
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
