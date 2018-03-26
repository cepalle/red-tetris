import React from "react";
import {connect} from 'react-redux';
import {placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {clonePiece, clonePlayerStates} from "../util/clone-handler";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const GridPlayerComponent = ({playerState, piecesFlow}) => {

  /* PLAYERGRID */

  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win) {
    playerState.grid = placePiecePreview(playerState.grid, piecesFlow[0]);
    playerState.grid = placePiece(playerState.grid, piecesFlow[0]);
  }

  const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
    playerState.win ? PIECES_NUM.wall_win: PIECES_NUM.wall);

  const gridRender = [];
  playerState.grid.forEach(l => {
    gridRender.push([wall_type, ...l, wall_type]);

  });
  gridRender[3] = Array(GRID_WIDTH + 2).fill(wall_type);
  gridRender.push(Array(GRID_WIDTH + 2).fill(wall_type));

  /* PIECEFLOW */

  const piecesRender = piecesFlow.filter((e, i) => i > 0 && i < 4);

  let previewRender = [];

  previewRender.push(Array(4 + 1).fill(wall_type));
  for (let i = 0; i < 3; i++) {
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push([...(Array(4).fill(PIECES_NUM.empty)), wall_type]);
    previewRender.push(Array(4 + 1).fill(wall_type));
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
    <div className={"row center"}>
      <p className={"pad font_white font_retro"}>
        YOU!{playerState.master && "(Master)"}{playerState.loose && "(loose)"}{playerState.win && "(Win)"}
      </p>
      <p className={"pad font_white font_retro"}>
        score:{playerState.score}
      </p>
      <p className={"pad font_white font_retro"}>
        lines completed:{playerState.lines}
      </p>
    </div>
  </div>;
};

const mapStateToProps = state => {
  return {
    playerState: clonePlayerStates(state.playerStates).find(e => e.playerName === state.playerName),
    piecesFlow: state.piecesFlow.map(p => clonePiece(p)),
  }
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
