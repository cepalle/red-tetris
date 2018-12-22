import * as React from "react";
import {connect} from 'react-redux';
import {PIECES_NUM, placePiece, placePiecePreview} from "../util/grid-piece-handler";
import {GRID_WIDTH} from "../../common/grid";
import {IPiece, IPlayerState, IState} from "../reducers/reducer";

const mapStateToProps = (state: IState) => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName,
    piecesFlow: state.piecesFlow
  }
};

interface IProps {
  playerStates: IPlayerState[],
  playerName: string,
  piecesFlow: IPiece[]
}

const chooseWallType = (player: IPlayerState): PIECES_NUM => {
  return (
    player.loose ?
      PIECES_NUM.wall_loose :
      player.win ?
        PIECES_NUM.wall_win :
        player.spectator ?
          PIECES_NUM.wall_spect :
          PIECES_NUM.wall
  )
};

const initFlowRender = (wall_type: PIECES_NUM): PIECES_NUM[][] => {
  const lineBuild = [...(Array(4).fill(PIECES_NUM.empty)), wall_type];

  const scarBuild = [
    lineBuild,
    lineBuild,
    lineBuild,
    Array(4 + 1).fill(wall_type)
  ];

  return [
    Array(4 + 1).fill(wall_type),
    ...scarBuild,
    ...scarBuild,
    ...scarBuild,
  ];
};

const GridPlayerComponent = (props: IProps) => {
  /* PLAYERGRID */
  const {playerStates, playerName, piecesFlow} = props;

  const playerState: IPlayerState = playerStates.find(e => e.playerName === playerName);

  const wall_type = chooseWallType(playerState);

  const gridWithPiece = (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) ?
    placePiece(placePiecePreview(playerState.grid, piecesFlow[0]), piecesFlow[0]) :
    playerState.grid;

  const gridRender = gridWithPiece.map(l => [wall_type, ...l, wall_type]);
  gridRender[3] = Array(GRID_WIDTH + 2).fill(wall_type);
  gridRender.push(Array(GRID_WIDTH + 2).fill(wall_type));
  gridRender.shift();
  gridRender.shift();
  gridRender.shift();

  /* PIECEFLOW */
  let previewRender = initFlowRender(wall_type);

  const piecesRender = piecesFlow.filter((e, i) => i > 0 && i < 4);

  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    for (let i = 0; i < piecesRender.length; i++) {
      const piece = piecesRender[i];
      const newPiece = {
        ...piece,
        pos: {
          ...piece.pos,
          x: 0,
          y: 1 + i * 5
        }
      };
      previewRender = placePiece(previewRender, newPiece);
    }
  }

  /* add to gridRender */
  previewRender.forEach((l, i) => gridRender[i].push(...l));

  return (
    <div className={"column"}>
      <div>
        <div className={"column"}>
          {gridRender.map((line, i) =>
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
  );
};

const GridPlayer = connect(
  mapStateToProps,
  undefined
)(GridPlayerComponent);

export {GridPlayer};
