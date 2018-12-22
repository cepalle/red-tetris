import React from "react";
import connect from "react-redux/es/connect/connect";
import {store} from "../middlewares/store";
import {UPDATE_ROOM_PLAYER_NAME} from "../actions/action-creators";

const mapStateToProps = state => {
  return {
    games: state.games,
    error: state.error
  }
};

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
    store.dispatch(UPDATE_ROOM_PLAYER_NAME(this.state.roomName, this.state.playerName));
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
                      placeholder={"Choose or create room"}/>
            </label>
            <label>
              [<input type="text"
                      value={this.state.playerName}
                      onChange={e => this.handleChangePlayer(e)}
                      placeholder={"Your Name"}/>]
            </label>
            <input type="submit" value="Join"/>
          </form>

          <div className={"column pad"}>
            <div className={"pad"}>
              Current Room:
            </div>
            {this.props.games.length === 0 &&
            <div>
              No current room
            </div>}
            {this.props.games.map((r, i) =>
              <button className={"font_retro buttonPlay font_white font_button_home"} key={i}
                      onClick={() => this.setRoomName(r.name)}>{r.name + (!r.waiting ? "(playing)" : "")}
              </button>
            )}
          </div>

          {playerInRoom &&
          <div className={"column pad"}>
            <div className={"pad"}>
              Current Player in this room:
            </div>
            <div className={"pad"}>
              {playerInRoom.map((p, i) =>
                <div key={i} className={"font_retro font_white"}>
                  {p.playerName}
                </div>)}
            </div>
          </div>
          }
          {this.props.error.type === "PLAYER_ALREADY_IN_ROOM" &&
          <p className={"font_red pad"}>{"A player as already your pseudo in this room"}<br/></p>}

        </div>
      </div>
    );
  }
}

const Home = connect(
  mapStateToProps,
  undefined
)(HomeComponent);

export {Home};
