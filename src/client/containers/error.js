import React from "react";
import {connect} from 'react-redux';

const ErrorComponent = ({error}) =>
  <div>
    {error.type && error.message && <p>errorType: {error.type} <br/> errorMessage: {error.message}</p>}
  </div>
;

const mapStateToProps = state => {
  return {
    error: Object.assign({}, state.error)
  }
};

const Messages = connect(
  mapStateToProps,
  undefined
)(ErrorComponent);

export {Messages};
