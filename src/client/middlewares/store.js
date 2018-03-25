import {createStore, applyMiddleware} from 'redux'
import {reducer} from "../reducers/reducer";
import {socketMiddleware} from "./socketMiddleware";

const store = createStore(
  reducer,
  applyMiddleware(
    socketMiddleware
  )
);

export {store};
