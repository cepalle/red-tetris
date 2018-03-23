import React from "react";
import {connect} from 'react-redux';
import {clonePlayerStates} from "../util/clone-handler"
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";

const OpponentComponent = ({states}) => {
  return <div className={"row wrap"}>
    {states.map((state, k) => {
        const grid = state.grid.map(l => l.map(e => e));

        for (let i = 0; i < GRID_WIDTH; i++) {
          let obstacle = false;
          for (let j = 0; j < GRID_HEIGHT; j++) {
            if (grid[j][i] !== 0) {
              obstacle = true;
            }
            if (obstacle) {
              grid[j][i] = 7;
            }
          }
        }

        const gridRender = [];
        grid.forEach((l, i) => {
          gridRender.push([-1, ...l, -1]);
        });
        gridRender[3] = Array(GRID_WIDTH + 2).fill(-1);
        gridRender.push(Array(GRID_WIDTH + 2).fill(-1));

        return <div key={k}>
          <div className={"column pad"}>
            {gridRender.map((line, i) => i > 2 &&
              <div key={i} className={"row"}>
                {line.map((el, j) =>
                  <div key={j} className={(el > 0 ? "piece" + el : "case" + -el)}/>
                )}
              </div>
            )}
          </div>
          <div className={"row center"}>
            <p>{state.playerName}{state.isMaster && "(Master)"}{state.hasLoose && "(loose)"}{state.hasWin && "(Win)"}</p>
          </div>
        </div>
          ;
      }
    )}
  </div>
    ;
};

const mapStateToProps = state => {
  return {states: clonePlayerStates(state.playerStates).filter(el => el.playerName !== state.playerName)};
};

const Opponents = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponents};
