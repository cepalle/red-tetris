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
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {};
};

interface IProps {
  playerName: string | undefined,
  roomName: string | undefined,
}

const AppComponent = (props: IProps) => {

  const {playerName, roomName} = props;

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
