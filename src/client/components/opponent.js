import React from "react";
import {connect} from 'react-redux';

const OpponentComponent = ({states}) =>
  <div className={"line"}>
    {states.map((state, k) =>
      <div key={k}>
        <div className={"grid"}>
          {state.grid.map((line, i) =>
            <div key={i} className={"line"}>
              {line.map((el, j) =>
                <div key={j} className={"part" + el} onClick={() => onClickCase(el)}/>
              )}
            </div>
          )}
        </div>
        <div className={"line center"}>
          <p>{state.playerName}{state.isMaster && "(Master)"}</p>
        </div>
      </div>
    )}
  </div>
;

const mapStateToProps = state => {
  return {states: state.playerStates.filter(el => el.playerName !== state.playerName)};
};

const Opponent = connect(
  mapStateToProps,
  undefined
)(OpponentComponent);

export {Opponent};
