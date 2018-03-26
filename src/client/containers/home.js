import React from "react";
import {store} from "../middlewares/store"
import {updateRoomPlayerName} from "../actions/action-creators"
import connect from "react-redux/es/connect/connect"

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
      playerName: ''
    };
  }

  handleChangeRoom(event) {
    this.setState({roomName: event.target.value});
  }

  handleChangePlayer(event) {
    this.setState({playerName: event.target.value});
  }

  handleSubmit(event) {
    window.location.href = "#" + this.state.roomName + "[" + this.state.playerName + "]";
    store.dispatch(updateRoomPlayerName(this.state.roomName, this.state.playerName));
    event.preventDefault();
  }

  setRoomName(name) {
    this.setState({roomName: name});
  }

  render() {
    const room = this.props.games.find(e => e.name === this.state.roomName);
    let playerInRoom;
    if (room) {
      playerInRoom = room.players
    }
    return (
      <div className={"row center font_white pad"}>
        <div className={"color8"}>
          <div className={"row center"}>
            <h1 className={"font_white font_retro"}>TETRIS</h1>
          </div>
          <form onSubmit={e => this.handleSubmit(e)} className={"pad"}>
            <label>
              #<input type="text"
                      value={this.state.roomName}
                      onChange={e => this.handleChangeRoom(e)}
                      placeholder={"Your room"}/>
            </label>
            <label>
              [<input type="text"
                      value={this.state.playerName}
                      onChange={e => this.handleChangePlayer(e)}
                      placeholder={"Your Name"}/>]
            </label>
            <input type="submit" value="Submit"/>
          </form>

          <div className={"column pad"}>
            <div>
              Current Room: (You can choose a new room for create it)
            </div>
            {this.props.games.length === 0 &&
            <div>
              No current room
            </div>}
            {this.props.games.map((r, i) =>
              <button className={"font_retro font_white buttonPlay"} key={i}
                      onClick={() => this.setRoomName(r.name)}>{r.name}</button>
            )}
          </div>

          {playerInRoom &&
          <div className={"column pad"}>
            <div>
              Current Player in this room: (Please choose an other Name)
            </div>
            {playerInRoom.map((p, i) =>
              <div key={i} className={"font_retro font_white"}>
                {p.playerName}
              </div>)}
          </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    games: state.games.map(g => g),
  }
};

const Home = connect(
  mapStateToProps,
  undefined
)(HomeComponent);

export {Home};
