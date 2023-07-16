import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
    ws.on('error', (error) => {
        console.log('Error: ', error);
        return;
    } );

    console.log('new client connected');
    ws.send('Welcome new client!');
  
    // ws.on('message', function message(data) {
    //   console.log('received: %s', data);
    //     ws.send('Got your message! its: ' + data);
    // });

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
        
      });

  });

app.get('/', (req, res) => res.send('Hello World!'));

server.listen(PORT, () => console.log(`Listening on port: ${PORT}!`));
