import * as React from 'react';
import {
  SEND_JOIN_ROOM,
  SEND_SUB_ROOMS_PLAYERS_NAME,
  SEND_UN_SUB_ROOMS_PLAYERS_NAME,
} from '../redux/actions/action-creators';
import { useEffect, useState } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { useCallback } from 'react';
import { IRoomPlayersName } from '@src/common/socketEventClient';
import { IDataState } from '@src/client/redux/reducer';

export const setChange = (set: (i: any) => void) => (event: any) => set(event.target.value);

const checkRoomPlayerName = (roomName: string | undefined, playerName: string | undefined): boolean => {
  if (roomName === undefined || playerName === undefined) {
    return false
  }

  if (roomName.length < 3 || playerName.length < 3) {
    return false;
  }
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0; i < roomName.length; i++) {
    if (!letters.includes(roomName[i])) {
      return false;
    }
  }

  for (let i = 0; i < playerName.length; i++) {
    if (!letters.includes(playerName[i])) {
      return false;
    }
  }

  return true;
};

const checkRoomPlayerNameExiste = (
  roomName: string,
  playerName: string,
  roomsPlayersName: IRoomPlayersName[],
): boolean => {

  for (let i = 0; i < roomsPlayersName.length; i++) {
    if (roomsPlayersName[i].roomName !== roomName) {
      continue;
    }
    for (let j = 0; j < roomsPlayersName[i].playerNames.length; j++) {
      if (roomsPlayersName[i].playerNames[j] === playerName) {
        return false;
      }
    }
  }

  return true;
};

export const Home = () => {

  const dispatch = useDispatch();

  const mapState = useCallback(
    (state: IDataState) => ({
      roomsPlayersName: state.roomsPlayersName,
    }),
    [],
  );
  const { roomsPlayersName } = useMappedState(mapState);

  const [roomNameInput, setRoomNameInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState('');

  useEffect(() => {
    dispatch(SEND_SUB_ROOMS_PLAYERS_NAME());
    return () => {
      dispatch(SEND_UN_SUB_ROOMS_PLAYERS_NAME());
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (checkRoomPlayerName(roomNameInput, playerNameInput) &&
      checkRoomPlayerNameExiste(roomNameInput, playerNameInput, roomsPlayersName)) {
      dispatch(SEND_JOIN_ROOM(playerNameInput, roomNameInput));
    }
  };

  const room = roomsPlayersName.find(e => e.roomName === roomNameInput);
  const playerInRoom = (room) ? room.playerNames : undefined;

  return (
    <div className={'row center font_white pad'}>
      <div className={'color8'}>
        <div className={'row center'}>
          <h1 className={'font_white font_retro'}>TETRIS</h1>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={'pad'}>
          <label>
            #<input type="text"
                    value={roomNameInput}
                    onChange={setChange(setRoomNameInput)}
                    placeholder={'Choose or create room'}/>
          </label>
          <label>
            [<input type="text"
                    value={playerNameInput}
                    onChange={setChange(setPlayerNameInput)}
                    placeholder={'Your Name'}/>]
          </label>
          <input type="submit" value="Join"/>
        </form>

        {!checkRoomPlayerName(roomNameInput, playerNameInput) &&
        <div className={'column pad font_red'}>
          Player and Room name must have minimum <br/>three characters, letter or number.
        </div>
        }

        {!checkRoomPlayerNameExiste(roomNameInput, playerNameInput, roomsPlayersName) &&
        <div className={'column pad font_red'}>
          A player has already this name in this room.
        </div>
        }

        <div className={'column pad'}>
          <div className={'pad'}>
            Current Room:
          </div>

          {roomsPlayersName.length === 0 &&
          <div>
            No room
          </div>
          }

          {roomsPlayersName.map((r, i) =>
            <button className={'font_retro buttonPlay font_white font_button_home'} key={i}
                    onClick={() => setRoomNameInput(r.roomName)}>{r.roomName}
            </button>,
          )}
        </div>

        {playerInRoom && room &&
        <div className={'column pad'}>
          <div className={'pad'}>
            Current Player in {room.roomName}:
          </div>
          <div className={'pad'}>
            {playerInRoom.map((name, i) =>
              <div key={i} className={'font_retro font_white'}>
                {name}
              </div>,
            )}
          </div>
        </div>
        }

      </div>
    </div>
  );
};
