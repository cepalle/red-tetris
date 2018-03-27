import React from "react";
import connect from "react-redux/es/connect/connect"
import {HomeComponent} from "../components/home-component";

const mapStateToProps = state => {
  return {
    games: state.games.map(g => g),
  }
};

const Home = connect(
  mapStateToProps,
  undefined
)(HomeComponent);

export {Home};
