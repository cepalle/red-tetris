import React from "react";

const OpponentComponent = ({infoRenders}) =>
  <div className={"row wrap center"}>
    {infoRenders.map((infoRender, k) =>
      <div key={k} className={"color8 pad"}>
        <div className={"column"}>
          {infoRender.grid.map((line, i) =>
            i > 2 &&
            <div key={i} className={"row"}>
              {line.map((el, j) => <div key={j} className={"caseOpponent color" + el}/>
              )}
            </div>
          )}
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {infoRender.playerState.playerName}{infoRender.playerState.master && "(Master)"}
          {infoRender.playerState.loose && "(loose)"}{infoRender.playerState.win && "(Win)"}
        </span>
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {"score:" + infoRender.playerState.score}
        </span>
        </div>
        <div className={"row center"}>
        <span className={"font_white font_retro"}>
          {"lines completed:" + infoRender.playerState.lines}
        </span>
        </div>
      </div>
    )}
  </div>
;

export {OpponentComponent};
