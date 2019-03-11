import * as React from 'react';
import { TetrisGame } from './tetris-game';
import { Home } from './home';
import { Redirect, Route, Switch } from 'react-router';
import { useStoreConnected } from '@src/client/hooks/useStoreConnected';

const OffLineComponent = () => (
  <div className={'row center font_white'}>
    <p className={'color8 pad'}>
      Server Offline
    </p>
  </div>
);

const App = () => {

  const connected = useStoreConnected();

  return !connected ? <OffLineComponent/> : (
    <Switch>
      <Route path="/game" component={TetrisGame}/>
      <Route path="/" component={Home}/>
      <Route render={() => <Redirect to="/"/>}/>
    </Switch>
  );

};

export { App };
