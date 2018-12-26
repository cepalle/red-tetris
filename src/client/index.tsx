import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './middlewares/store';
import './index.css';
import {App} from '@src/client/containers/app';
import {SEND_MOVE_PIECE} from '@src/client/actions/action-creators';
import {eventHandler} from '@src/client/util/event-handler';
import {ENUM_PIECES_MOVE} from '@src/common/grid-piece-handler';
import {onAll} from '@src/client/util/socket-handler';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app'),
);

onAll(store)();

const eventHandlerWithStore = eventHandler(store);

window.addEventListener(
  'keydown',
  (event) => eventHandlerWithStore(event),
  false,
);

window.setInterval(
  () => store.dispatch(SEND_MOVE_PIECE(ENUM_PIECES_MOVE.DOWN)),
  500,
);
