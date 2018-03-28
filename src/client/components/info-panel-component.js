import React from "react";
import mp3 from '../assets/Original_Tetris_theme.mp3'

const InfoPanelComponent = ({
                              error, animate, master, playerName, roomName,
                              onClickButton, onClickHome, params, onChangeAddWallLine, onChangeGroundResizer
                            }) =>
  <div className={"column width_info_panel spaceBetween"}>
    <div className={"row"}>
      <div className={"column"}>
        <div className={"row center pad buttonPlay"} onClick={() => onClickHome()}>
          <img className={"pad"} src={require("../assets/home-8x.png")} height="32" width="32" alt={"home"}/>
          <h1 className={"font_white font_retro pad"}>TETRIS</h1>
        </div>
        <div className={"font_white pad"}>
          <div className={"pad"}>
            {"<keyRight>: move right"}<br/>
            {"<keyLeft>: move left"}<br/>
            {"<keyDown>: move down"}<br/>
            {"<keyUp>: rotate right"}<br/>
            {"<keySpace>: place the piece"}<br/>
            {"<keyEnter>: start the game if your are master"}<br/>
            {"<keyS> or <keyC>: switch the current piece with the next piece"}<br/>
          </div>

          {playerName && roomName && master &&
          <div className={"pad"}>
            <div className={"row"}>
              Options:
            </div>
            <label className={"row"}>
              <input
                name="addWallLine"
                type="checkbox"
                checked={params.addWallLine}
                onChange={() => onChangeAddWallLine()}/>
              : Add malus lines to adversers when lines are completed.
            </label>
            <label className={"row"}>
              <input
                name="groundResizer"
                type="checkbox"
                checked={params.groundResizer}
                onChange={() => onChangeGroundResizer()}/>
              : Increase the height of the Tetris grid in multiplayer mode.
            </label>
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
          <p className={"font_red"}>{"ERROR: " + error.type}<br/></p>}

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

export {InfoPanelComponent};
