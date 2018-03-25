import React from "react";
import {connect} from 'react-redux';

const InfoPanelComponent = ({error}) =>
  <div className={"column width_info_panel color0"}>
    <div className={"row center"}>
      <h1>TETRIS</h1>
    </div>
    <div>
      {"For play you need add to the url: #<roomName>[<yourPseudo>]"}<br/>
      {"Exemple: cepalle.github.io/red-tetris/#chateauHyrule[Zelda]"}<br/>
      {"<keyRight>: move right"}<br/>
      {"<keyLeft>: move left"}<br/>
      {"<keyDown>: move down"}<br/>
      {"<keyUp>: rotate right"}<br/>
      {"<space>: place the piece"}<br/>
    </div>

    {error.type && error.message && <p>errorType: {error.type} <br/> errorMessage: {error.message}</p>}
  </div>
;

const mapStateToProps = state => {
  return {
    error: Object.assign({}, state.error)
  }
};

const InfoPanel = connect(
  mapStateToProps,
  undefined
)(InfoPanelComponent);

export {InfoPanel};
