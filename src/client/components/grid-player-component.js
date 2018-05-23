import React from "react";

const GridPlayerComponent = ({playerState, gridRender}) =>
  <div className={"column"}>
    <div>
      <div className={"column"}>
        {gridRender.map((line, i) =>
          i > 2 &&
          <div key={i} className={"row"}>
            {line.map((el, j) => <div key={j} className={"casePlayer + color" + el}/>)}
          </div>
        )}
      </div>
    </div>
    <div className={"column center"}>
      <span className={"pad font_white font_retro row center"}>
        YOU!{playerState.master && "(Master)"}{playerState.loose && "(lost)"}{playerState.win && "(Win)"}
        {playerState.spectator && "(Spectator)"}
      </span>
      <div className={"row center"}>
        <span className={"pad font_white font_retro"}>
        score:{playerState.score}
        </span>
        <span className={"pad font_white font_retro"}>
        lines completed:{playerState.lines}
        </span>
      </div>
    </div>
  </div>
;

export {GridPlayerComponent};
