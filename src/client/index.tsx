import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { StoreContext } from 'redux-react-hook';
import { App } from '@src/client/component/app';
import { onAll } from '@src/client/socket-handler';
import { reducer } from '@src/client/redux/reducer';
import { socketMiddleware } from '@src/client/redux/socketMiddleware';

const store = createStore(
  reducer,
  applyMiddleware(
    socketMiddleware,
  ),
);

onAll(store)();

ReactDOM.render(
  <Provider store={store}>
    <StoreContext.Provider value={store}>
        <App/>
    </StoreContext.Provider>
  </Provider>
  , document.getElementById('app'));
