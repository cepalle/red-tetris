import * as React from 'react';
import {InfoPanel} from './info-panel';
import {GridPlayer} from './grid-player';
import {Opponents} from './opponents';
import {IState} from '../reducers/reducer';
import {Dispatch} from 'redux';
import {ReduxAction, SEND_JOIN_ROOM, SEND_QUIT_ROOM} from '../actions/action-creators';
import {connect} from 'react-redux';
import {checkRoomPlayerName} from '@src/client/util/checkRoomPlayerName';
import {eventHandlerWithStore} from '@src/client/middlewares/store';

const mapStateToProps = (state: IState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<ReduxAction>) => {
  return {
    joinRoom: (playerName: string, roomName: string) => dispatch(SEND_JOIN_ROOM(playerName, roomName)),
    quitRoom: () => dispatch(SEND_QUIT_ROOM()),
  };
};

interface IProps {
  joinRoom: (playerName: string, roomName: string) => void;
  quitRoom: () => void;
  location: any
}

interface IStateComponent {
}

class TetrisGameComponent extends React.Component<IProps, IStateComponent> {
  public componentDidMount() {
    const {joinRoom, location} = this.props;
    const params = new URLSearchParams(location.search);

    const roomNameOrNull = params.get('roomName');
    const roomName = roomNameOrNull === null ? '' : roomNameOrNull;
    const playerNameOrNull = params.get('playerName');
    const playerName = playerNameOrNull === null ? '' : playerNameOrNull;

    if (!checkRoomPlayerName(roomName, playerName)) {
      window.location.href = `#/home`;
    } else {
      joinRoom(playerName, roomName);
    }

    // ---

    window.addEventListener(
      'keydown',
      eventHandlerWithStore,
      false,
    );
  }

  public componentWillUnmount() {
    const {quitRoom} = this.props;
    quitRoom();

    window.removeEventListener(
      'keydown',
      eventHandlerWithStore,
      false,
    );
  }

  public render(): React.ReactNode {
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
  }
}

const TetrisGame = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TetrisGameComponent);

export {TetrisGame};
