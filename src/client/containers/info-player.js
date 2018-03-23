import React from "react";
import {connect} from 'react-redux';

const ErrorComponent = ({playerName, roomName}) =>
  <div>
    <p>Your Pseudo:{playerName}</p><br/>
    <p>Your Room:{roomName}</p>
  </div>
;

const mapStateToProps = state => {
  return {
    playerName: state.playerName,
    roomName: state.roomName
  }
};

const InfoPlayer = connect(
  mapStateToProps,
  undefined
)(ErrorComponent);

export {InfoPlayer};
