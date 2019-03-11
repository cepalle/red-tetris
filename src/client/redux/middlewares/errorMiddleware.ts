import { EnumAction, ReduxAction } from '../actions/action-creators';
import { push } from 'connected-react-router';

const errorMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {

  switch (action.type) {
    case EnumAction.ON_SET_ERROR:
      store.dispatch(push('/#/home'));
      break;
    default:
      break;
  }

  return next(action);
};

export {
  errorMiddleware,
};
