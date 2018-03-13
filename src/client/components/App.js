import React from "react";
import {store} from "../store";
import {Grid, Line} from "./grid-player";

const App = () => {
  let state = store.getState();
  return (
    <div>
      <Grid grid={state.grids[0].grid} />
      <br/>
      <p>part flow:</p><Line line={state.parts_flow}/>
    </div>
  );
};

export default App;
