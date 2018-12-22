import * as React from 'react';
import {connect} from 'react-redux';
import {GRID_WIDTH} from '../../common/grid';
import {IPlayerState, IState} from '@src/client/reducers/reducer';
import {chooseWallType, ENUM_PIECES} from '@src/client/util/grid-piece-handler';

const mapStateToProps = (state: IState) => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName,
  };
};

interface IProps {
  playerStates: IPlayerState[],
  playerName: string
}

const OpponentComponent = (props: IProps) => {

  const {playerStates, playerName} = props;

  const opponent = playerStates.filter((p) => p.playerName === playerName);

  const infoRenders: Array<{
    grid: ENUM_PIECES[][];
    playerState: IPlayerState;
  }> = opponent.map((playerState) => {

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
      playerState: playerState,
    };
  });

  return <div className={'row wrap center'}>
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
          {infoRender.playerState.playerName}{infoRender.playerState.master && '(Master)'}
          {infoRender.playerState.loose && '(lost)'}{infoRender.playerState.win && '(Win)'}
          {infoRender.playerState.spectator && '(Viewer)'}
        </span>
        </div>
        <div className={'row center'}>
        <span className={'font_white font_retro'}>
          {'score:' + infoRender.playerState.score}
        </span>
        </div>
        <div className={'row center'}>
        <span className={'font_white font_retro'}>
          {'lines completed:' + infoRender.playerState.lines}
        </span>
        </div>
      </div>,
    )}
  </div>;
};

const Opponents = connect(
  mapStateToProps,
  undefined,
)(OpponentComponent);

export {Opponents};
