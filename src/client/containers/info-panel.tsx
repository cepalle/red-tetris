import * as React from 'react';
import {connect} from 'react-redux';
import {
  ReduxAction, REFRESH, SEND_START_GAME, SEND_UPDATE_OPTION_GAME,
} from '../actions/action-creators';
import {Dispatch} from 'redux';
import {IState} from '@src/client/reducers/reducer';
import {store} from '@src/client/middlewares/store';
import {IOptionGame} from '@src/common/ITypeRoomManager';

const mp3 = require('@src/client/assets/Original_Tetris_theme.mp3');

const mapStateToProps = (state: IState) => {

  const room = state.roomState;

  if (room === undefined) {
    return {
      optionGame: undefined,
      playing: false,
    };
  }
  return {
    optionGame: room.optionGame,
    playing: room.playing,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {
    onChangeAddWallLine: (): void => {
      const roomState = store.getState().roomState;
      if (roomState === undefined) {
        return;
      }

      const oldOption = roomState.optionGame;
      dispatch(SEND_UPDATE_OPTION_GAME({
        ...oldOption,
        addWallLine: !oldOption.addWallLine,
      }));
    },
    onChangeGroundResizer: (): void => {
      const roomState = store.getState().roomState;
      if (roomState === undefined) {
        return;
      }

      const oldOption = roomState.optionGame;
      dispatch(SEND_UPDATE_OPTION_GAME({
        ...oldOption,
        groundResizer: !oldOption.groundResizer,
      }));
    },
    onClickStartGame: (): void => {
      dispatch(SEND_START_GAME());
    },
    refresh: () => dispatch(REFRESH(true)),
  };
};

interface IProps {
  optionGame: IOptionGame | undefined,
  playing: boolean,

  onChangeAddWallLine: () => void,
  onChangeGroundResizer: () => void,
  onClickStartGame: () => void,
  refresh: () => void,
}

const InfoPanelComponent = (props: IProps) => {

  const {playing, optionGame, onChangeAddWallLine, onChangeGroundResizer, onClickStartGame} = props;

  const onClickHome = () => {
    window.location.href = ``;
    // refresh();
  };

  return (
    <div className={'column width_info_panel spaceBetween'}>
      <div className={'row'}>
        <div className={'column'}>
          <div className={'row center pad buttonPlay'} onClick={() => onClickHome()}>
            <img className={'pad'} src={require('../assets/home-8x.png')} height="32" width="32" alt={'home'}/>
            <h1 className={'font_white font_retro pad'}>TETRIS</h1>
          </div>

          <div className={'font_white pad'}>
            <div className={'pad color0'}>
              <span className={'font_color_key'}>{'<keyRight>'}</span>{': move right'}<br/>
              <span className={'font_color_key'}>{'<keyLeft>'}</span>{': move left'}<br/>
              <span className={'font_color_key'}>{'<keyDown>'}</span>{': move down'}<br/>
              <span className={'font_color_key'}>{'<keyUp>'}</span>{': rotate right'}<br/>
              <span className={'font_color_key'}>{'<keySpace>'}</span>{': place the piece'}<br/>
              <span className={'font_color_key'}>{'<keyEnter>'}</span>{': start the game if your are master'}<br/>
              <span className={'font_color_key'}>{'<keyS>'}</span>
              {'or'}
              <span
                className={'font_color_key'}>{'<keyC>'}</span>{': switch the current piece with the next piece'}<br/>
            </div>

            {playing && optionGame &&
            <div className={'pad'}>
              <div className={'row'}>
                Options:
              </div>
              <label className={'row'}>
                <input
                  name="addWallLine"
                  type="checkbox"
                  checked={optionGame.addWallLine}
                  onChange={() => onChangeAddWallLine()}/>
                : Add malus lines to adversers when lines are completed.
              </label>
              <label className={'row'}>
                <input
                  name="groundResizer"
                  type="checkbox"
                  checked={optionGame.groundResizer}
                  onChange={() => onChangeGroundResizer()}/>
                : Increase the height of the Tetris grid in multiplayer mode.
              </label>
              <button className={'font_retro font_white font_button buttonPlay'} onClick={() => onClickStartGame()}>
                Play!
              </button>
            </div>
            }

          </div>
        </div>
      </div>
      <div className={'row'}>
        <div className={'column'}>
          <audio controls loop autoPlay src={mp3} className={'color0'}/>
        </div>
      </div>
    </div>
  );
};

const InfoPanel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoPanelComponent);

export {InfoPanel};
