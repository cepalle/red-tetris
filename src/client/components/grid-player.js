import React from "react";
import {add_parts_flow} from "../action-creators";
import {store} from "../store";





import { connect } from 'react-redux';









const Line = props => {
  return (
    <div className="line">
      {props.line.map((el, i) =>
        <div key={i} className={"part_" + el} onClick={() => {

          store.dispatch(add_parts_flow([props.line[i]]));
          console.log(props.line[i]);


        }
        }/>
      )}
    </div>
  );
};

const Grid = props => {
  return (
    <div className="grid">
      {props.grid.map((el, i) => <Line key={i} line={el}/>)}
    </div>
  );
};

export {Grid, Line};
