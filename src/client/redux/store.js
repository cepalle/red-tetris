import {createStore} from 'redux'
import {reducer} from "../reducers/reducer";

const store = createStore(reducer, undefined);

export {store};
