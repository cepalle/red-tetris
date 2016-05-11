# Red Tetris Boilerplate

This starter kit was made to help students to develop red_tetris project : a Full Stack Javascript Tetris. We can also use it as a starting point for any product made of React / Redux and socket.io.

It helps:

* to transpile with Babel ES6 code
* to bundle with Wbepack JS files and hot reload client's code
* to write tests and check code coverage. 

Because we use React, Redux, Node.js and Socket.io, we had to define 3 kinds of unit tests :

* React ones like explained in redux documentation + `chai-equal-jsx`
* Redux ones, but instead of just testing pure functions, we defined a middleware to test state’s impact after one or many actions.
* Redux/Socket.io/Node.js, same as before, we use the same middleware but this time we can test state’s updates after socketio messages round trip.

### Install

Install [node](https://nodejs.org/en/) first. After that:

```
$ npm install
```

Edit `params.js` for your needs.


### Development Mode

#### Launch Server

```
$ npm run  srv-dev
> red_tetrisboilerplate@0.0.1 srv-dev /home/eric/JS/red_tetris_boilerplate
> DEBUG=tetris:* babel-watch -w src src/server/main.js
```

It launches a node.js server listening for socket.io connexions, that is wired to receive `ping` messages and answered to … `pong`.

#### Launch Client

```
$ npm run client-dev
> red_tetrisboilerplate@0.0.1 client-dev /home/eric/JS/red_tetris_boilerplate
> webpack-dev-server --colors --hot --inline --host 0.0.0.0 --port 8080

http://0.0.0.0:8080/
webpack result is served from /
content is served from /home/eric/JS/red_tetris_boilerplate
…
webpack: bundle is now VALID.
```


Point your browser to `http://0.0.0.0:8080/` it will load client side application. You should see `Soon, will be here a fantastic Tetris ...`, open your console and check you have :

```
[HMR] Waiting for update signal from WDS...
bundle.js:28328  action @ 14:29:58.602 ALERT_POP 
bundle.js:28340  prev state Object
bundle.js:28344  action Object
bundle.js:28352  next state Object
bundle.js:616 [WDS] Hot Module Replacement enabled.
```

URL is not yet editable in `params.js`, change it directly inside `package.json`.

As you can guess we are using webpack `hot reload` module, try to update any file under `src/client` and your browser should reload your code.

```
[WDS] App updated. Recompiling...
```


#### Test

Test, test and re-test …

Stop server, or use an other setup (//TODO)
```
$ npm run test
```

Tests are installed under `test` folder.

#### fake.js

A simple template to implement simple unit tests. In Tetris context you will try to test every functions or classes from server or client code. Just import your files and check (http://shouldjs.github.io/)[should] documentation to extend the test.


#### redux.js

Target is to test `actions` and `reducers` in one time. You can always split those tests as explained [here](http://redux.js.org/docs/recipes/WritingTests.html).
Look at the code :

```
//cat redux1.js
// 1
import {configureStore} from './helpers/server'
// 2
import rootReducer from '../src/client/reducers'
import {ALERT_POP, alert} from '../src/client/actions/alert'
import chai from "chai"
const MESSAGE = "message"
chai.should()
describe('Fake redux test', function(){
  it('alert it', function(done){
    const initialState = {}
   // 3
    const store =  configureStore(rootReducer, null, initialState, {
      ALERT_POP: ({dispatch, getState}) =>  {
        const state = getState()
        state.message.should.equal(MESSAGE)
        done()
      }
    })
   // 4
    store.dispatch(alert(MESSAGE))
  });

});
```

1. We use a special middleware to set up hooks in action’s workflow.
2. We use here the  root reducer, but it can be replaced by  any kind of reducer
3. target is to check updates in our store, so we have to create a store for each check (`it()`), `configureStore` is a store helper.

*configureStore* :

* `reducer`:  not necessary the root one
* `socket`:  (unused here)
* `initial state`:  set up to realize the action
* `actions hook`: object where keys are action’s type and values are callbacks. `action’s type` is one of your actions defined in your application, `callback` function will receive  {getState, dispatch, action} as real parameter.

Thanks to the hook you can react to actions, just to check a new state after an action, or to send actions to follow a workflow and check state at the end.


In our sample, we register a callback when `ALERT_POP` will be dispatched and check that `state.message`is right. Callback is called after reducers.


#### server.js

Very similar to previous test, but offer to test server code involved in a client action. You can use this kind of solution to test a pipeline like `action -> fetch -> action -> reducer`. Here client / server communication is based on socket.io and we use a middleware inspired by [redux-socket.io](https://github.com/itaylor/redux-socket.io) to transparantly dispatch and receive socket.io messages. So our test covers  `action -> socket.emit -> server code -> client socket callback -> action -> reducer`. I do not know if it’s still a unit test, but it’s a useful solution to test.

Let’s have a look on code:


```
import chai from "chai"
import {startServer, configureStore} from './helpers/server'
import rootReducer from '../src/client/reducers'
// 1
import {ping} from '../src/client/actions/server'
import io from 'socket.io-client'
import params from '../params'
chai.should()

describe('Fake server test', function(){
  let tetrisServer

// 2 
  before(cb => startServer( params.server, function(err, server){
    tetrisServer = server
    cb()
  }))

  after(function(done){tetrisServer.stop(done)})

  it('should pong', function(done){
    const initialState = {}
    const socket = io(params.server.url)
    // 3
    const store =  configureStore(rootReducer, socket, initialState, {
      'pong': () =>  done()
    })
    store.dispatch(ping())
  });
});
```


1. This time we will test server actions: it means client actions that transparently communicate with server
2. for each `describe` we have to launch the server. Tetris server is statefull, so we can run multiple tests (`it`) on one server to check behavior (ex: multiple users, events)
3. Now we have a socket (client connection), so middleware is able to send socket.io messages to server.

In our context, we dispatch `ping` action and register a callback on `pong` action.

#### Coverage

```
npm run coverage

> red_tetrisboilerplate@0.0.1 coverage /home/eric/JS/red_tetris_boilerplate
> NODE_ENV=test nyc -r lcov -r text mocha --require babel-core/register

```

Check results …. of this command, and launch your browser to `./coverage/lcov-report/index.html`


### Production Mode

It’s not a production recipe to run your Tetris over billions of players, but just 2 commands to run it without live reload.

```
$ npm run srv-dist

> red_tetrisboilerplate@0.0.1 srv-dist /home/eric/JS/red_tetris_boilerplate
> DEBUG=tetris:* babel src --out-dir dist

src/client/actions/alert.js -> dist/client/actions/alert.js
src/client/actions/server.js -> dist/client/actions/server.js
src/client/components/test.js -> dist/client/components/test.js
src/client/containers/app.js -> dist/client/containers/app.js
src/client/index.js -> dist/client/index.js
src/client/middleware/storeStateMiddleWare.js -> dist/client/middleware/storeStateMiddleWare.js
src/client/reducers/alert.js -> dist/client/reducers/alert.js
src/client/reducers/index.js -> dist/client/reducers/index.js
src/server/index.js -> dist/server/index.js
src/server/main.js -> dist/server/main.js

$ npm run client-dist

> red_tetrisboilerplate@0.0.1 client-dist /home/eric/JS/red_tetris_boilerplate
> NODE_ENV=production webpack --progress --colors

Hash: 6841f78bfe6867fb2913  
Version: webpack 1.13.0
Time: 1923ms
    Asset    Size  Chunks             Chunk Names
bundle.js  754 kB       0  [emitted]  main
    + 197 hidden modules

$  DEBUG=tetris:* node dist/server/main.js 
  tetris:info tetris listen on http://0.0.0.0:3004 +0ms
  not yet ready to play tetris with U ...
```

In production mode, node.js server serves `index.html` and `bundle.js`, so you have to point to url set up in `params.js` 

That’s all folks ... 
