import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './middlewares/store';
import './index.css';
import './util/event-handler';
import {App} from '@src/client/containers/app';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'));

/*
window.addEventListener('keydown', event =>
    eventHandler(event,
      !store.getState().playerName || !store.getState().roomName,
      store.dispatch),
  false);

window.setInterval(() =>
    animateClock(store.dispatch, store.getState().animate),
  500);
*/
