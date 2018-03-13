import {createStore} from 'redux'
import {reducer} from "./reducer";

const store = createStore(reducer, undefined);

export {store};
