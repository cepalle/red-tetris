import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './middlewares/store';
import './index.css';
import {AppComponent} from '@src/client/components/app-component';
import {HashRouter} from 'react-router-dom';

render(
  <Provider store={store}>
    <HashRouter>
      <AppComponent/>
    </HashRouter>
  </Provider>,
  document.getElementById('app'),
);
