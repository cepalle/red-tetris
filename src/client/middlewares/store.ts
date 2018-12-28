import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers/reducer';
import {socketMiddleware} from './socketMiddleware';
import {errorMiddleware} from '@src/client/middlewares/errorMiddleware';

const store = createStore(
  reducer,
  applyMiddleware(
    errorMiddleware,
    socketMiddleware,
  ),
);

export {store};
