import * as React from 'react';
import { Provider } from 'react-redux';
import './index.css';
import { reducer } from '@src/client/redux/reducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { StoreContext } from 'redux-react-hook';
import ReactDOM from 'react-dom';
import { App } from '@src/client/component/app';

const createRootReducer = (hist: any) => combineReducers({
  router: connectRouter(hist),
  data: reducer,
});

const history = createBrowserHistory();

const configureStore = (preloadedState: any) => {
  return createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  );
};

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <StoreContext.Provider value={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </StoreContext.Provider>
  </Provider>
  , document.getElementById('root'));
