# red-tetris (work in progress)

libs that can be useful to add:
* redux-logger
* redux-thunk
* redux-promise
* chai
* chai-as-promised
* chai-equal-jsx
* eslint
* eslint-plugin-babel
* eslint-plugin-react
* mocha
* nyc
* webpack-dev-middleware
* webpack-hot-middleware
* lodash
* Ramda
* immutable
* Flyd

Client:
   - Redux (store data)
      - all table and players names
      - Piece Flu
      - is_master?
      - player name
      - position de la piece courant
   - React (display)
   - API socket.io
    - receive all update from server ...
    - send envent to the server ...

Server:
  - Async
  - data:
    - rooms: (players and player master?)
  - API:
    - Deconnection
    - choose next master
    - Gen 10 pieces aleatoire
    - send in rooms client message ...

Bonus:
   - ???
