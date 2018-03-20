import React from "react";
import {connect} from 'react-redux';
import {clonePlayerStates, getColorNum} from "../util/utils"
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";

const OpponentComponent = ({states}) => {
  return <div className={"line"}>
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

        return <div key={k}>
          <div className={"grid opponent"}>
            {grid.map((line, i) => i >= 4 &&
              <div key={i} className={"line"}>
                {line.map((el, j) =>
                  <div key={j} className={"case color" + getColorNum(el)}/>
                )}
              </div>
            )}
          </div>
          <div className={"line center"}>
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

const OpponentContainer = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {OpponentContainer};
