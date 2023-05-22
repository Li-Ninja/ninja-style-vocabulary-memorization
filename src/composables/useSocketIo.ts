import { io, Socket } from 'socket.io-client';

let socketIo: Socket;

export function bootSocketIo(url: string) {
  if (!socketIo) {
    socketIo = io(url);
  }

  socketIo.on('connect', () => {
    // socket.io connected
  });

  socketIo.on('disconnect', () => {
    // socket.io disconnected
  });
}

export function useSocketIo() {
  return {
    socketIo,
  };
}
