import * as React from 'react';
import {connect} from 'react-redux';
import {IError, IGame, IState} from '@src/client/reducers/reducer';
import {useState} from 'react';

const mapStateToProps = (state: IState) => {
  return {
    games: state.games,
    error: state.error,
  };
};

interface IProps {
  games: IGame[],
  error: IError,
}

const HomeComponent = (props: IProps) => {

  const {games, error} = props;

  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');

  /*
  handleSubmit(event) {
    window.location.href = '#' + this.state.roomName + '[' + this.state.playerName + ']';
    store.dispatch(UPDATE_ROOM_PLAYER_NAME(this.state.roomName, this.state.playerName));
    event.preventDefault();
  }
  */

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // TODO
  };

  const handleChangeRoom = (e: any) => {
    e.preventDefault();
    setRoomName(e.target.value);
  };

  const handleChangePlayer = (e: any) => {
    e.preventDefault();
    setPlayerName(e.target.value);
  };

  const room = games.find(e => e.name === roomName);
  const playerInRoom = (room) ? room.players : undefined;

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
          {games.length === 0 &&
          <div>
            No current room
          </div>}
          {games.map((r, i) =>
            <button className={'font_retro buttonPlay font_white font_button_home'} key={i}
                    onClick={() => setRoomName(r.name)}>{r.name + (!r.waiting ? '(playing)' : '')}
            </button>,
          )}
        </div>

        {playerInRoom &&
        <div className={'column pad'}>
          <div className={'pad'}>
            Current Player in this room:
          </div>
          <div className={'pad'}>
            {playerInRoom.map((p, i) =>
              <div key={i} className={'font_retro font_white'}>
                {p.playerName}
              </div>)}
          </div>
        </div>
        }

        {error.type === 'PLAYER_ALREADY_IN_ROOM' &&
        <p className={'font_red pad'}>{'A player as already your pseudo in this room'}<br/></p>
        }

      </div>
    </div>
  );
};

const Home = connect(
  mapStateToProps,
  undefined,
)(HomeComponent);

export {Home};
