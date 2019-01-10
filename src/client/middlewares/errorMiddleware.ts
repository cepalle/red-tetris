import {EnumAction, ReduxAction} from '@src/client/actions/action-creators';

const errorMiddleware = (store: any) => (next: any) => (action: ReduxAction) => {

  switch (action.type) {
    case EnumAction.ON_SET_ERROR:
      try {
        window.location.href = `#home`;
        window.location.reload();
      } catch (e) {

      }
      break;
    default:
      break;
  }

  return next(action);
};

export {
  errorMiddleware,
};
