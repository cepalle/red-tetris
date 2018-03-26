import React from "react";
import {connect} from 'react-redux';
import {clonePlayerStates} from "../util/clone-handler"
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const OpponentComponent = ({playerStates}) => {
  return <div className={"row wrap center"}>
    {playerStates.map((playerState, k) => {
        const grid = playerState.grid.map(l => l.map(e => e));

        const wall_type = (playerState.loose ? PIECES_NUM.wall_loose :
          playerState.win ? PIECES_NUM.wall_win : PIECES_NUM.wall);

        for (let i = 0; i < GRID_WIDTH; i++) {
          let obstacle = false;
          for (let j = 0; j < GRID_HEIGHT; j++) {
            if (grid[j][i] !== PIECES_NUM.empty) {
              obstacle = true;
            }
            if (obstacle) {
              grid[j][i] = PIECES_NUM._7;
            }
          }
        }

        const gridRender = [];
        grid.forEach((l, i) => {
          gridRender.push([wall_type, ...l, wall_type]);
        });
        gridRender[3] = Array(GRID_WIDTH + 2).fill(wall_type);
        gridRender.push(Array(GRID_WIDTH + 2).fill(wall_type));

        return <div key={k} className={"color8 pad"}>
          <div className={"column"}>
            {gridRender.map((line, i) => i > 2 &&
              <div key={i} className={"row"}>
                {line.map((el, j) => <div key={j} className={"caseOpponent color" + el}/>
                )}
              </div>
            )}
          </div>
          <div className={"row center"}>
            <span className={"font_white font_retro"}>
              {playerState.playerName}{playerState.master && "(Master)"}{playerState.loose && "(loose)"}{playerState.win && "(Win)"}
            </span>
          </div>
          <div className={"row center"}>
            <span className={"font_white font_retro"}>
              {"score:" + playerState.score}
            </span>
          </div>
          <div className={"row center"}>
            <span className={"font_white font_retro"}>
              {"lines completed:" + playerState.lines}
            </span>
          </div>
        </div>
          ;
      }
    )}
  </div>
    ;
};

const mapStateToProps = state => {
  return {playerStates: clonePlayerStates(state.playerStates).filter(el => el.playerName !== state.playerName)};
};

const Opponents = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponents};
