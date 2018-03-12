import React from "react";

const LinePlayer = (props) => {
  let line_render = [];
  for (let i = 0; i < props.line.length; i++) {
    line_render.push(
      <div key={i}>{props.line[i]}</div>
    );
  }
  return (
    <div className="linePlayer">
      {line_render}
    </div>
  );
};

const GridPlayer = (props) => {
  let grid_render = [];
  for (let i = 0; i < props.grid.length; i++) {
    grid_render.push(
      <LinePlayer key={i} line={props.grid[i]}/>
    );
  }

  return (
    <div className="gridPlayer">
      {grid_render}
    </div>
  );
};

export {GridPlayer};
