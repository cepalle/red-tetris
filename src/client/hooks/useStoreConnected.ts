import { useCallback } from 'react';
import { useMappedState } from 'redux-react-hook';
import { IRouterState } from '@src/client/redux/reducer';

export const useStoreConnected = () => {
  const mapState = useCallback(
    (state: IRouterState) => ({
      connected: state.data.socket.connected,
    }),
    [],
  );
  const { connected } = useMappedState(mapState);
  return connected;
};
