import * as React from 'react';
import {connect} from 'react-redux';
import {chooseWallType, ENUM_PIECES, placePiece, placePiecePreview} from '../util/grid-piece-handler';
import {GRID_WIDTH} from '../../common/grid';
import {IPiece, IPlayerState, IState} from '../reducers/reducer';

const mapStateToProps = (state: IState) => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName,
    piecesFlow: state.piecesFlow,
  };
};

interface IProps {
  playerStates: IPlayerState[],
  playerName: string,
  piecesFlow: IPiece[]
}

const initFlowRender = (wallType: ENUM_PIECES): ENUM_PIECES[][] => {
  const lineBuild = [...(Array(4).fill(ENUM_PIECES.empty)), wallType];

  const scarBuild = [
    lineBuild,
    lineBuild,
    lineBuild,
    Array(4 + 1).fill(wallType),
  ];

  return [
    Array(4 + 1).fill(wallType),
    ...scarBuild,
    ...scarBuild,
    ...scarBuild,
  ];
};

const GridPlayerComponent = (props: IProps) => {
  /* PLAYERGRID */
  const {playerStates, playerName, piecesFlow} = props;

  const playerState = playerStates.find(e => e.playerName === playerName);

  if (playerState === undefined) {
    return <div>an error occurred</div>;
  }

  const wallType = chooseWallType(playerState);

  const gridWithPiece = (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) ?
    placePiece(placePiecePreview(playerState.grid, piecesFlow[0]), piecesFlow[0]) :
    playerState.grid;

  const gridRender = gridWithPiece.map(l => [wallType, ...l, wallType]);
  gridRender[3] = Array(GRID_WIDTH + 2).fill(wallType);
  gridRender.push(Array(GRID_WIDTH + 2).fill(wallType));
  gridRender.shift();
  gridRender.shift();
  gridRender.shift();

  /* PIECEFLOW */
  let previewRender = initFlowRender(wallType);

  const piecesRender = piecesFlow.filter((e, i) => i > 0 && i < 4);

  if (piecesFlow.length > 0 && !playerState.loose && !playerState.win && !playerState.spectator) {
    for (let i = 0; i < piecesRender.length; i++) {
      const piece = piecesRender[i];
      const newPiece = {
        ...piece,
        pos: {
          ...piece.pos,
          x: 0,
          y: 1 + i * 5,
        },
      };
      previewRender = placePiece(previewRender, newPiece);
    }
  }

  /* add to gridRender */
  previewRender.forEach((l, i) => gridRender[i].push(...l));

  return (
    <div className={'column'}>
      <div>
        <div className={'column'}>
          {gridRender.map((line, i) =>
            <div key={i} className={'row'}>
              {line.map((el, j) => <div key={j} className={'casePlayer + color' + el}/>)}
            </div>,
          )}
        </div>
      </div>
      <div className={'column center'}>
      <span className={'pad font_white font_retro row center'}>
        YOU!{playerState.master && '(Master)'}{playerState.loose && '(lost)'}{playerState.win && '(Win)'}
        {playerState.spectator && '(Viewer)'}
      </span>
        <div className={'row center'}>
        <span className={'pad font_white font_retro'}>
        score:{playerState.score}
        </span>
          <span className={'pad font_white font_retro'}>
        lines completed:{playerState.lines}
        </span>
        </div>
      </div>
    </div>
  );
};

const GridPlayer = connect(
  mapStateToProps,
  undefined,
)(GridPlayerComponent);

export {GridPlayer};
