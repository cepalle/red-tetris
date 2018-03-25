import React from "react";
import {connect} from 'react-redux';

const InfoPanelComponent = ({error, animate, isMaster, playerName, roomName}) =>
  <div className={"column width_info_panel"}>
    <div className={"row center"}>
      <h1 className={"font_white font_retro"}>TETRIS</h1>
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

      {playerName && roomName && !animate && isMaster &&
      <p className={"font_green"}>{"You are currently waiting for other players"}<br/></p>}
      {playerName && roomName && !animate && !isMaster &&
      <p className={"font_green"}>{"You are currently waiting for master player"}<br/></p>}
      {error.type === "PLAYER_ALREADY_IN_ROOM" &&
      <p className={"font_red"}>{"A player as already your pseudo in this room"}<br/></p>}
      {(!playerName || !roomName) &&
      <p className={"font_red"}>{"You need to join a room and take a pseudo"}<br/>
        {"(The room will be created if doesn't exist)"}<br/></p>}
    </div>
  </div>
;

const mapStateToProps = state => {
  return {
    error: Object.assign({}, state.error),
    animate: state.animate,
    isMaster: state.playerStates.find(e => e.playerName === state.playerName).isMaster,
    playerName: state.playerName,
    roomName: state.roomName,
  }
};

const InfoPanel = connect(
  mapStateToProps,
  undefined
)(InfoPanelComponent);

export {InfoPanel};
