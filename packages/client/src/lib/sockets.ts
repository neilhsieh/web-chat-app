import io, { } from 'socket.io-client';

// export const adminSocket = io('%%API_URL%%', { forceNew: true });
export const adminSocket = io('http://localhost:9999', { forceNew: true });
adminSocket.connect();

adminSocket.send('hello');
// @ts-ignore
window.adminSocket = adminSocket;

export const joinRoom = (convoID: string) => {
  adminSocket.emit('room', convoID);
};
