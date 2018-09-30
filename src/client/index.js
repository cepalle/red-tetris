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

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app"));

window.addEventListener('keydown', e => eventHandler(e), false);

window.setInterval(() =>
    animateClock(store.dispatch, store.getState().animate)
  , 500);

emitHome(socketEmit);
