import { Server } from 'socket.io';
import { Message } from '../models/Message';

let server: Server;


export default (s: Server) => {

  server = s;
  s.on('connection', (socket) => {
    console.log('Got a connection');
    // socket.on('room', room => socket.join(room));
    socket.on('message', function (message: string) {
      console.log('New socket message client', message);
      s.send('server response')
    });
  });
};

export const messageRoom = (convoID: string, message: Message) => {
  server.sockets.in(convoID).emit('message', message.toJSON());
};
