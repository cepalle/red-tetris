import * as React from 'react';
import {connect} from 'react-redux';
import {IState} from '@src/client/reducers/reducer';
import {IRoomPlayersName} from '@src/common/socketEventClient';

const mapStateToProps = (state: IState) => {
  return {
    roomsPlayersName: state.roomsPlayersName,
  };
};

interface IProps {
  roomsPlayersName: IRoomPlayersName[],
}

interface IStateComponent {
  roomName: string,
  playerName: string,
}

class HomeComponent extends React.Component<IProps, IStateComponent> {
  public readonly state: IStateComponent = {
    roomName: '',
    playerName: '',
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
    const {roomName, playerName} = this.state;

    if (roomName.length > 1 && playerName.length > 1) {
      window.location.href = `#${roomName}[${playerName}]`;
      location.reload();
    }
  };

  public handleChangeRoom = (e: any) => {
    e.preventDefault();
    this.setState({
      roomName: e.target.value,
    });
  };

  public setRoomName = (roomName: string) => {
    this.setState({
      roomName: roomName,
    });
  };

  public handleChangePlayer = (e: any) => {
    e.preventDefault();
    this.setState({
      playerName: e.target.value,
    });
  };

  public render(): React.ReactNode {

    const {handleChangePlayer, handleChangeRoom, handleSubmit, setRoomName} = this;
    const {roomsPlayersName} = this.props;
    const {roomName, playerName} = this.state;

    const room = roomsPlayersName.find(e => e.roomName === roomName);
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
                      value={roomName}
                      onChange={(e) => handleChangeRoom(e)}
                      placeholder={'Choose or create room'}/>
            </label>
            <label>
              [<input type="text"
                      value={playerName}
                      onChange={(e) => handleChangePlayer(e)}
                      placeholder={'Your Name'}/>]
            </label>
            <input type="submit" value="Join"/>
          </form>

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
                      onClick={() => setRoomName(r.roomName)}>{r.roomName}
              </button>,
            )}
          </div>

          {playerInRoom &&
          <div className={'column pad'}>
            <div className={'pad'}>
              Current Player in this room:
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
  }
}

const Home = connect(
  mapStateToProps,
  undefined,
)(HomeComponent);

export {Home};
