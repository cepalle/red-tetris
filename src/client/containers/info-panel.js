import React from "react";
import {connect} from 'react-redux';
import {sendStartGame, updateRoomPlayerName} from "../actions/action-creators";
import mp3 from '../assets/Original_Tetris_theme.mp3'

const InfoPanelComponent = ({error, animate, master, playerName, roomName, onClickButton, onClickHome}) =>
  <div className={"column width_info_panel spaceBetween"}>
    <div className={"row"}>
      <div className={"column"} onClick={() => onClickHome()}>
        <div className={"row center pad buttonPlay"}>
          <img className={"pad"} src={require("../assets/home-8x.png")} height="32" width="32" alt={"home"}/>
          <h1 className={"font_white font_retro pad"}>TETRIS</h1>
        </div>
        <div className={"font_white pad"}>
          {"For play you need add to the url: #<roomName>[<yourPseudo>]"}<br/>
          {"> Exemple: cepalle.github.io/red-tetris/#chateauHyrule[Zelda]"}<br/>
          {"Refresh the page with the new url"}<br/><br/>
          {"<keyRight>: move right"}<br/>
          {"<keyLeft>: move left"}<br/>
          {"<keyDown>: move down"}<br/>
          {"<keyUp>: rotate right"}<br/>
          {"<keySpace>: place the piece"}<br/>
          {"<keyEnter>: start the game if your are master"}<br/>

          {playerName && roomName && master &&
          <div className={"pad"}>
            <button className={"font_retro font_white font_button buttonPlay"} onClick={() => onClickButton()}>
              Play!
            </button>
          </div>}

          {playerName && roomName && !animate && master &&
          <p className={"font_green"}>{"You are currently waiting for other players"}<br/></p>}

          {playerName && roomName && !animate && !master &&
          <p className={"font_green"}>{"You are currently waiting for master player"}<br/></p>}

          {(!playerName || !roomName) &&
          <p className={"font_red"}>{"You need to join a room and take a pseudo"}<br/>
            {"(The room will be created if doesn't exist)"}<br/></p>}


          {error.type === "PLAYER_ALREADY_IN_ROOM" &&
          <p className={"font_red"}>{"A player as already your pseudo in this room"}<br/></p>}

          {error.type && error.type === "ROOM_ALREADY_IN_GAME" &&
          <p className={"font_red"}>{"Others players are still playing"}<br/></p>}

          {error.type && error.type === "PLAYER_NOT_MASTER" &&
          <p className={"font_red"}>{"You need to be master for start the game"}<br/></p>}

          {error.type && error.type !== "PLAYER_ALREADY_IN_ROOM" &&
          error.type !== "PLAYER_NOT_MASTER" &&
          error.type !== "ROOM_ALREADY_IN_GAME" &&
          <p className={"font_red"}>{error.type}<br/></p>}

        </div>
      </div>
    </div>
    <div className={"row"}>
      <div className={"column"}>
        <audio controls loop autoPlay src={mp3} className={"color0"}/>
      </div>
    </div>
  </div>
;

const mapStateToProps = state => {
  return {
  error: Object.assign({}, state.error),
  animate: state.animate,
  master: state.playerStates.find(e => e.playerName === state.playerName).master,
  playerName: state.playerName,
  roomName: state.roomName,
}
};

const mapDispatchToProps = dispatch => {
  return {
    onClickButton: () => dispatch(sendStartGame()),
    onClickHome: () => {
      dispatch(updateRoomPlayerName("", ""));
      window.location.href = "";
    }
  };
};


const InfoPanel = connect(
mapStateToProps,
mapDispatchToProps
)(InfoPanelComponent);

export {InfoPanel};
