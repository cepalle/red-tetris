import React from "react";
import connect from "react-redux/es/connect/connect";
import {HomeComponent} from "../components/home-component";

const mapStateToProps = state => {
  return {
    games: state.games,
    error: state.error
  }
};

const Home = connect(
  mapStateToProps,
  undefined
)(HomeComponent);

export {Home};
