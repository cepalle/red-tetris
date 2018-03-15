import React from "react";
import {connect} from 'react-redux';
import {emitGenFlow} from "../socket/socket-api"

const UpdateGridTestComponent = ({onClickButon}) =>
  <div>
    <div onClick={() => onClickButon()}>
      Buton flow socket.io
    </div>
  </div>
;

const mapDispatchToProps = dispatch => {
  return {
    onClickButon: () => emitGenFlow()
  }
};

const UpdateGridTest = connect(
  undefined,
  mapDispatchToProps
)(UpdateGridTestComponent);

export {UpdateGridTest};
