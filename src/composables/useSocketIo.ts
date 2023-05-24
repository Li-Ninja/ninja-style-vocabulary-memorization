import { io, Socket } from 'socket.io-client';
import { useLocalStorage } from '@/utils/localStorage.util';

let socketIo: Socket | undefined;
const { getToken } = useLocalStorage();

export function bootSocketIo(url: string) {
  const token = getToken();

  if (!socketIo) {
    socketIo = io(url, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  socketIo.on('connect', () => {
    // socket.io connected
  });

  socketIo.on('disconnect', () => {
    // socket.io disconnected
    socketIo = undefined;
  });
}

export function useSocketIo() {
  return socketIo;
}
