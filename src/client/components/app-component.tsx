import * as React from 'react';
import {TetrisGameComponent} from './tetris-game-component';
import {Home} from '../containers/home';
import {Redirect, Route, Switch} from 'react-router';
import {store} from '../middlewares/store';

const OffLineComponent = () => (
  <div className={'row center font_white'}>
    <p className={'color8 pad'}>
      Server Offline
    </p>
  </div>
);

const AppComponent = () => (
  <Switch>
    <Route path="/offline" component={OffLineComponent}/>
    <Route render={() => (
      store.getState().socket.connected ?
        <Switch>
          <Route path="/game" component={TetrisGameComponent}/>
          <Route path="/home" component={Home}/>
          <Route render={() => <Redirect to="/home"/>}/>
        </Switch> :
        <Redirect to={'/offline'}/>
    )
    }/>
  </Switch>
);

export {AppComponent};
