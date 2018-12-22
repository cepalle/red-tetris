import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from "./containers/app";
import {store} from "./middlewares/store";
import './index.css';
import "./util/event-handler";
import {eventHandler} from "./util/event-handler";
import {animateClock} from "./util/animate-handler";
import {emitHome} from "./util/socket-handler";
import {socketEmit} from "./util/socket";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("app"));

window.addEventListener('keydown', event =>
    eventHandler(event,
      !store.getState().playerName || !store.getState().roomName,
      store.dispatch),
  false);

window.setInterval(() =>
    animateClock(store.dispatch, store.getState().animate),
  500);

emitHome(socketEmit);
