import {createStore, applyMiddleware} from 'redux'
import {reducer} from "../reducers/reducer";
import {socketMiddleware} from "./socketMiddleware";
import {errorCleanMiddleware} from "./errorCleanMiddleware";

const store = createStore(
  reducer,
  applyMiddleware(
    socketMiddleware,
    errorCleanMiddleware
  )
);

export {store};
