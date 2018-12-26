import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './middlewares/store';
import './index.css';
import './util/event-handler';
import {App} from '@src/client/containers/app';
import {PIECE_MOVE} from '@src/client/actions/action-creators';
import {ENUM_PIECES_MOVE} from '@src/common/IType';
import {eventHandler} from '@src/client/util/event-handler';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'));

const eventHandlerWithStore = eventHandler(store);

window.addEventListener('keydown', event =>
    eventHandlerWithStore(event),
  false);

window.setInterval(() =>
    store.dispatch(PIECE_MOVE(ENUM_PIECES_MOVE.DOWN)),
  500);
