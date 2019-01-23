import * as React from 'react';
import {InfoPanel} from './info-panel';
import {GridPlayer} from './grid-player';
import {Opponents} from './opponents';
import {IState} from '../reducers/reducer';
import {Dispatch} from 'redux';
import {ReduxAction, SEND_JOIN_ROOM, SEND_QUIT_ROOM} from '../actions/action-creators';
import {connect} from 'react-redux';
import {IMatch} from '@src/client/util/IMatch';
import {checkRoomPlayerName} from '@src/client/util/checkRoomPlayerName';

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
  match: IMatch;
  joinRoom: (playerName: string, roomName: string) => void;
  quitRoom: () => void;
}

interface IStateComponent {
}

class TetrisGameComponent extends React.Component<IProps, IStateComponent> {
  public componentDidMount() {
    const {joinRoom} = this.props;
    const {params} = this.props.match;
    const roomName = params.get('roomName');
    const playerName = params.get('playerName');

    if (!checkRoomPlayerName(roomName, playerName)) {
      window.location.href = `#/home`;
    } else {
      joinRoom(playerName, roomName);
    }
  }

  public componentWillUnmount() {
    const {quitRoom} = this.props;
    quitRoom();
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
