import React from "react";
import {store} from "../store";
import {GridPlayer} from "./grid-player";

const App = () => {
  return (
    <div>
      <GridPlayer grid={store.getState().grids[0].grid} />
    </div>
  );
};

export default App;
