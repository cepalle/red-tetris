import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducer';
import {socketMiddleware} from './socketMiddleware';
import {onAll} from '../../util/socket-handler';
import {eventHandler} from '../../util/event-handler';
import { errorMiddleware } from '@src/client/redux/middlewares/errorMiddleware';

const store = createStore(
  reducer,
  applyMiddleware(
    errorMiddleware,
    socketMiddleware,
  ),
);

onAll(store)();

const eventHandlerWithStore = eventHandler(store);

export {
  store,
  eventHandlerWithStore,
};
