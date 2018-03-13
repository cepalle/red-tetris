import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {reducer} from "./reducer";
import App from "./components/App";
import './index.css'
//import {socket} from "./socketAPI";

let store = createStore(reducer, undefined);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById("app"));
