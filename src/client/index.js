import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import App from "./components/app";
import {store} from "./redux/store"
import './index.css'
import {movePiece} from "./redux/action-creators";
import {PIECES_MOVE} from "../common/pieces";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("app"));


window.addEventListener('keydown', function (event) {
  console.log("event:", event);
  switch (event.keyCode) {
    case 37: // Left
      store.dispatch(movePiece(PIECES_MOVE.LEFT));
      break;

    case 38: // Up
      store.dispatch(movePiece(PIECES_MOVE.ROT_RIGHT));
      break;

    case 39: // Right
      store.dispatch(movePiece(PIECES_MOVE.RIGHT));
      break;

    case 40: // Down
      store.dispatch(movePiece(PIECES_MOVE.DOWN));
      break;

    case 32: // Left
      store.dispatch(movePiece(PIECES_MOVE.DROP));
      break;
  }
}, false);
