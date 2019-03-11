import * as React from 'react';
import { InfoPanel } from './info-panel';
import { GridPlayer } from './grid-player';
import { Opponents } from './opponents';
import { checkRoomPlayerName } from '../util/checkRoomPlayerName';
import { useEffect } from 'react';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { SEND_JOIN_ROOM, SEND_QUIT_ROOM } from '@src/client/redux/actions/action-creators';
import { push } from 'connected-react-router';
import { useCallback } from 'react';
import { keysHandler } from '@src/client/util/keys-handler';
import { IDataState } from "@src/client/redux/reducer";

export const TetrisGame = () => {

  const dispatch = useDispatch();

  const mapState = useCallback(
    (state: IDataState) => ({
      playerName: state.playerName,
      roomName: state.roomName,
    }),
    [],
  );
  const { playerName, roomName } = useMappedState(mapState);

  useEffect(() => {

    if (playerName === undefined
      || roomName === undefined
      || !checkRoomPlayerName(roomName, playerName)
    ) {
      dispatch(push('/'));
    } else {
      dispatch(SEND_JOIN_ROOM(playerName, roomName));
    }

    return () => {
      dispatch(SEND_QUIT_ROOM());
    };
  });

  useEffect(() => {
    window.addEventListener(
      'keydown',
      keysHandler(dispatch),
      false,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        keysHandler(dispatch),
        false,
      );
    };
  });

  return (
    <div className={'column'}>
      <div className={'row center'}>
        <div className={'row color8 pad'}>
          <InfoPanel/>
          <GridPlayer/>
        </div>
      </div>
      <Opponents/>
    </div>
  );
};
