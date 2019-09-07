import * as React from 'react';
import { Game } from './game/game';
import { Home } from './home';
import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { IDataState } from '@src/client/redux/reducer';

const OffLineComponent = () => (
  <div className={'row center font_white'}>
    <p className={'color8 pad'}>
      Server Offline
    </p>
  </div>
);

const App = () => {

  const mapState = useCallback(
    (state: IDataState) => ({
      connected: state.socket.connected,
      playerName: state.playerName,
      roomName: state.roomState,
    }),
    [],
  );
  const { connected, playerName, roomName } = useMappedState(mapState);

  if (!connected) {
    return  <OffLineComponent/>;
  }
  if (playerName !== undefined && roomName !== undefined) {
    return <Game/>;
  }
  return <Home/>;
};

export { App };
