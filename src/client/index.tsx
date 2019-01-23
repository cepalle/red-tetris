import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './middlewares/store';
import './index.css';
import {AppComponent} from '@src/client/components/app-component';
import {eventHandler} from '@src/client/util/event-handler';
import {onAll} from '@src/client/util/socket-handler';
import {HashRouter} from 'react-router-dom';

render(
  <Provider store={store}>
    <HashRouter>
      <AppComponent/>
    </HashRouter>
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
