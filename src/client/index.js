import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import App from "./components/App";
import {store} from "./store"
import './index.css'
//import {socket} from "./socketAPI";


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("app"));
