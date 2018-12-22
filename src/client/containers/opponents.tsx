import * as React from "react";
import {connect} from 'react-redux';
import {PIECES_NUM} from "../../common/pieces";
import {GRID_WIDTH} from "../../common/grid";

const mapStateToProps = state => {
  return {
    playerStates: state.playerStates,
    playerName: state.playerName
  };
};

const OpponentComponent = ({playerStates, playerName}) => {
  const infoRenders = [];

  playerStates.forEach(playerState => {
    if (playerState.playerName === playerName) {
      return;
    }
    const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
      playerState.win ? PIECES_NUM.wall_win :
        playerState.spectator ? PIECES_NUM.wall_spect : PIECES_NUM.wall);
    const grid = playerState.grid.map(l => l.map(e => e));
    const gridRender = [];

    for (let i = 0; i < GRID_WIDTH; i++) {
      let obstacle = false;
      for (let j = 0; j < grid.length; j++) {
        if (grid[j][i] !== PIECES_NUM.empty) {
          obstacle = true;
        }
        if (obstacle) {
          grid[j][i] = PIECES_NUM._7;
        }
      }
    }

    grid.forEach(l => {
      gridRender.push([wall_type, ...l, wall_type]);
    });
    gridRender[3] = Array(GRID_WIDTH + 2).fill(wall_type);
    gridRender.push(Array(GRID_WIDTH + 2).fill(wall_type));

    infoRenders.push({
      grid: gridRender,
      playerState: playerState,
    });
  });

  return <div className={"row wrap center"}>
    {infoRenders.map((infoRender, k) =>
      <div key={k} className={"color8 pad"}>
        <div className={"column"}>
          {infoRender.grid.map((line, i) =>
            i > 2 &&
            <div key={i} className={"row"}>
              {line.map((el, j) => <div key={j} className={"caseOpponent color" + el}/>
              )}
            </div>
          )}
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {infoRender.playerState.playerName}{infoRender.playerState.master && "(Master)"}
          {infoRender.playerState.loose && "(lost)"}{infoRender.playerState.win && "(Win)"}
          {infoRender.playerState.spectator && "(Viewer)"}
        </span>
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {"score:" + infoRender.playerState.score}
        </span>
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {"lines completed:" + infoRender.playerState.lines}
        </span>
        </div>
      </div>
    )}
  </div>
};

const Opponents = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponents};
