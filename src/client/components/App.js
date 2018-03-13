import React from "react";
import {FlowTest} from "./flow-test";
import {GridPlayer} from "./grid-player"

const App = () =>
  <div>
    <GridPlayer/>
    <p>part flow:</p>
    <FlowTest/>
  </div>
;

export default App;
