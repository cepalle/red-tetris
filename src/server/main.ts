import * as express from 'express';
import * as https from 'https';
import {Server} from 'http';
import * as fs from 'fs';
import {Socket} from 'socket.io';
import {handleClient} from '@src/server/client';

const app = express();

app.use(express.static('build'));

const server = (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ?
  https.createServer(
    {
      key: fs.readFileSync('/home/ssl/privkey.pem'),
      cert: fs.readFileSync('/home/ssl/cert.pem'),
    }, app) :
  new Server(app);

const io = require('socket.io')(server);

io.on('connection', (s: Socket) => handleClient(s));

server.listen(4433, () => {
  console.log('Server on port : 4433');
});
