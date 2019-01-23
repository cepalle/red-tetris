import {createStore, applyMiddleware} from 'redux';
import {reducer} from '../reducers/reducer';
import {socketMiddleware} from './socketMiddleware';
import {errorMiddleware} from '@src/client/middlewares/errorMiddleware';
import {onAll} from '@src/client/util/socket-handler';
import {eventHandler} from '@src/client/util/event-handler';

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
