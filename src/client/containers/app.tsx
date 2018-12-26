import * as React from 'react';
import {IState} from '../reducers/reducer';
import {Dispatch} from 'redux';
import {
  ReduxAction,
} from '../actions/action-creators';
import {connect} from 'react-redux';
import {TetrisGameComponent} from '../components/tetris-game-component';
import {Home} from '@src/client/containers/home';

const mapStateToProps = (state: IState) => {
  return {
    playerName: state.playerName,
    roomName: state.roomName,
    isConnected: state.socket.connected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {};
};

interface IProps {
  playerName: string | undefined,
  roomName: string | undefined,
  isConnected: boolean,
}

const AppComponent = (props: IProps) => {

  const {playerName, roomName, isConnected} = props;

  if (!isConnected) {
    return (
      <div className={'row center font_white'}>
        <p className={'color8 pad'}>
          Server Offline
        </p>
      </div>
    );
  }

  if (playerName !== undefined && roomName !== undefined) {
    return <TetrisGameComponent/>;
  }

  return <Home/>;
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export {App};
