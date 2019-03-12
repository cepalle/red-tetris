import * as React from 'react';
import { IOptionGame } from '../../../common/ITypeRoomManager';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { useCallback } from 'react';
import { SEND_QUIT_ROOM, SEND_START_GAME, SEND_TOGGLE_OPTION_GAME } from '../../redux/actions/action-creators';
import { IDataState } from '../../redux/reducer';

const mp3 = require('../../assets/Original_Tetris_theme.mp3');

const InfoPanel = () => {

  const dispatch = useDispatch();

  const mapState = useCallback(
    (state: IDataState): {
      optionGame: IOptionGame | undefined;
      playing: boolean;
      isMaster: boolean;
    } => {
      const room = state.roomState;
      if (room === undefined) {
        return {
          optionGame: undefined,
          playing: false,
          isMaster: false,
        };
      }

      const player = room.players.find((p) => p.playerName === state.playerName);

      return {
        optionGame: room.optionGame,
        playing: room.playing,
        isMaster: player !== undefined ? player.isMaster : false,
      };
    },
    [],
  );
  const { isMaster, optionGame, playing } = useMappedState(mapState);

  const onClickHome = () => {
    dispatch(SEND_QUIT_ROOM());
  };

  return (
    <div className={'column width_info_panel spaceBetween'}>
      <div className={'row'}>
        <div className={'column'}>
          <div className={'row center pad buttonPlay'} onClick={() => onClickHome()}>
            <img className={'pad'} src={require('../../assets/home-8x.png')} height="32" width="32" alt={'home'}/>
            <h1 className={'font_white font_retro pad'}>TETRIS</h1>
          </div>

          <div className={'font_white pad'}>
            <div className={'pad color0'}>
              <span className={'font_color_key'}>{'<keyRight>'}</span>{': Move right'}<br/>
              <span className={'font_color_key'}>{'<keyLeft>'}</span>{': Move left'}<br/>
              <span className={'font_color_key'}>{'<keyDown>'}</span>{': Move down'}<br/>
              <span className={'font_color_key'}>{'<keyUp>'}</span>{': Rotate right'}<br/>
              <span className={'font_color_key'}>{'<keySpace>'}</span>{': Place the piece'}<br/>
              <span className={'font_color_key'}>{'<keyS>'}</span>
              {'or'}
              <span
                className={'font_color_key'}>{'<keyC>'}</span>{': Switch the current piece with the next piece'}<br/>
            </div>

            {!playing && optionGame !== undefined && isMaster &&
            <div className={'pad'}>
              <div className={'row'}>
                Options:
              </div>
              <label className={'row'}>
                <input
                  name="addWallLine"
                  type="checkbox"
                  checked={optionGame.addWallLine}
                  onChange={() => dispatch(SEND_TOGGLE_OPTION_GAME('addWallLine'))}/>
                : Add malus lines to adversers when lines are completed.
              </label>
              <label className={'row'}>
                <input
                  name="groundResizer"
                  type="checkbox"
                  checked={optionGame.groundResizer}
                  onChange={() => dispatch(SEND_TOGGLE_OPTION_GAME('groundResizer'))}/>
                : Increase the height of the Tetris grid in multiplayer mode.
              </label>
              <button className={'font_retro font_white font_button buttonPlay'}
                      onClick={() => dispatch(SEND_START_GAME())}>
                Play!
              </button>
            </div>
            }

          </div>
        </div>
      </div>
      <div className={'row'}>
        <div className={'column'}>
          <audio controls={true} loop={true} autoPlay={true} src={mp3} className={'color0'}/>
        </div>
      </div>
    </div>
  );
};

export { InfoPanel };
