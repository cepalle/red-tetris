import {createStore} from 'redux'
import {reducer} from "./reducer";
import {logger_component} from "../logger";

const store = createStore(reducer, undefined);

export {store};
