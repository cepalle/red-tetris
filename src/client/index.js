import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import App from "./containers/app";
import {store} from "./middlewares/store";
import './index.css';
import "./util/event-listener-handler";
import {eventHandler} from "./util/event-listener-handler";
import {animateClock} from "./util/animate-handler";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app"));

window.addEventListener('keydown', e => eventHandler(e), false);
animateClock();
