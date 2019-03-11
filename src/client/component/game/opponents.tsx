import * as React from 'react';
import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { chooseWallType, ENUM_PIECES, GRID_WIDTH } from '../../../common/grid-piece-handler';
import { IPlayerClient } from '../../../common/socketEventClient';
import { IDataState } from '../../redux/reducer';

const opponentsToInfoRenders = (opponents: IPlayerClient[]): Array<{
  grid: ENUM_PIECES[][];
  player: IPlayerClient;
}> => {
  return opponents.map((playerState) => {

    const wallType = chooseWallType(playerState);
    const grid = playerState.grid.map(l => l.map(e => e));

    for (let i = 0; i < GRID_WIDTH; i++) {
      let obstacle = false;
      for (let j = 0; j < grid.length; j++) {
        if (grid[j][i] !== ENUM_PIECES.empty) {
          obstacle = true;
        }
        if (obstacle) {
          grid[j][i] = ENUM_PIECES.n7;
        }
      }
    }

    const gridRender = grid.map((l) => [wallType, ...l, wallType]);
    gridRender[3] = Array(GRID_WIDTH + 2).fill(wallType);
    gridRender.push(Array(GRID_WIDTH + 2).fill(wallType));
    gridRender.shift();
    gridRender.shift();
    gridRender.shift();

    return {
      grid: gridRender,
      player: playerState,
    };
  });
};

const Opponents = () => {

  const mapState = useCallback(
    (state: IDataState) => ({
      opponents: state.roomState === undefined ? []
        : state.roomState.players.filter((p) => p.playerName !== state.playerName),
    }),
    [],
  );
  const { opponents } = useMappedState(mapState);

  const infoRenders = opponentsToInfoRenders(opponents);

  return (
    <div className={'row wrap center'}>
      {infoRenders.map((infoRender, k) =>
        <div key={k} className={'color8 pad'}>
          <div className={'column'}>
            {infoRender.grid.map((line, i) =>
              <div key={i} className={'row'}>
                {line.map((el, j) => <div key={j} className={'caseOpponent color' + el}/>)}
              </div>,
            )}
          </div>
          <div className={'row center'}>
        <span className={'font_white font_retro'}>
          {infoRender.player.playerName}
          {infoRender.player.isMaster && '(Master)'}
          {infoRender.player.lost && '(Lost)'}
          {infoRender.player.win && '(Win)'}
          {infoRender.player.isSpectator && '(Viewer)'}
        </span>
          </div>
          <div className={'row center'}>
        <span className={'font_white font_retro'}>
          {'score:' + infoRender.player.score}
        </span>
          </div>
          <div className={'row center'}>
        <span className={'font_white font_retro'}>
          {'lines completed:' + infoRender.player.nbLineCompleted}
        </span>
          </div>
        </div>,
      )}
    </div>
  );
};

export { Opponents };
