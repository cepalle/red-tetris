import React from "react";
import {store} from "../store";
import {Grid, Line} from "./grid-player";

const App = () => {
  return (
    <div>
      <Grid grid={store.getState().grids[0].grid} />
      <br/>
      <Line line={store.getState().parts_flow}/>
    </div>
  );
};

export default App;
