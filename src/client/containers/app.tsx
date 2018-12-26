import * as React from 'react';
import {ENUM_ROUTE, IState} from '../reducers/reducer';
import {Dispatch} from 'redux';
import {ReduxAction} from '../actions/action-creators';
import {connect} from 'react-redux';
import {TetrisGameComponent} from '../components/tetris-game-component';
import {Home} from '@src/client/containers/home';

const mapStateToProps = (state: IState) => {
  return {
    route: state.route,
    isConnected: state.socket.connected,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {};
};

interface IProps {
  route: ENUM_ROUTE,
  isConnected: boolean,
}

const AppComponent = (props: IProps) => {

  const {route, isConnected} = props;

  if (!isConnected) {
    return (
      <div className={'row center font_white'}>
        <p className={'color8 pad'}>
          Server Offline
        </p>
      </div>
    );
  }

  if (route === ENUM_ROUTE.TETRIS_GAME) {
    return <TetrisGameComponent/>;
  }

  return <Home/>;
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export {App};
