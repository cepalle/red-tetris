## Overview

Full Stack Javascript Multiplayer Tetris Game build with Node, socket.io, React and Redux.

Play it at: https://cepalle.github.io/red-tetris/

## Run it locally

in src/client/util/socket-handler.js

Switch comment line:
````javascript
const socket = io.connect('http://localhost:4433');
// const socket = io.connect('https://le-101.tk:4433');
````

Then run:
````cmd
 npm install
 npm run client-dev
````
and:
````cmd
 npm install
 npm run srv-dev
````

## Images

### How connect:

![Connect_img](https://github.com/cepalle/red-tetris/blob/master/assets/connect_img.png)

### Play!

![Game_img](https://github.com/cepalle/red-tetris/blob/master/assets/game_img.png)
