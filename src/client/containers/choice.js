import React from "react";
import connect from "react-redux/es/connect/connect";

const ChoiceComponent = ({data}) =>
  <div className={"row wrap center"}>
  </div>
;

const mapStateToProps = state => {
  return {data: false};
};

const Choice = connect(
  mapStateToProps,
  undefined
)(ChoiceComponent);

export {Choice};
