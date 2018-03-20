import {createStore, applyMiddleware} from 'redux'
import {reducer} from "../reducers/reducer";
import {socketMiddleware} from "./socketMiddleware";
import {animateMiddleware} from "./animateMiddleware"

const store = createStore(
  reducer,
  applyMiddleware(
    socketMiddleware,
    animateMiddleware
  )
);

export {store};
