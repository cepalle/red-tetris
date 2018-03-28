import React from "react";
import {connect} from 'react-redux';
import {clonePlayerState} from "../util/clone-handler"
import {OpponentComponent} from "../components/opponents-component";
import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const mapStateToProps = state => {

  const infoRenders = [];

  state.playerStates.forEach(playerState => {
    if (playerState.playerName === state.playerName) {
      return;
    }
    const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
      playerState.win ? PIECES_NUM.wall_win : PIECES_NUM.wall);
    const grid = playerState.grid.map(l => l.map(e => e));
    const gridRender = [];

    for (let i = 0; i < GRID_WIDTH; i++) {
      let obstacle = false;
      for (let j = 0; j < state.gridHeight; j++) {
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
      playerState: clonePlayerState(playerState),
    });
  });

  return {infoRenders: infoRenders};
};

const Opponents = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponents};
