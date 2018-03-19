import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import App from "./components/app";
import {store} from "./redux/store"
import './index.css'
import "./util/add-event-listener";

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("app"));

