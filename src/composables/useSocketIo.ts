import {
  Socket, io,
} from 'socket.io-client';
import { SocketEventEnum } from '@/enums/socket.enum';
import { useLocalStorage } from '@/utils/localStorage.util';

let socketIo: Socket | undefined;
const { getToken } = useLocalStorage();

export function bootSocketIo(url: string): Promise<SocketEventEnum> {
  return new Promise(resolve => {
    const token = getToken();

    if (!socketIo) {
      socketIo = io(url, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    socketIo.on(SocketEventEnum.Connect, () => {
      // socket.io connected
    });

    socketIo.on('check-connection', (res: { isSuccess: boolean }) => {
      if (res.isSuccess) {
        resolve(SocketEventEnum.Connect);
      } else {
        socketIo?.disconnect();
        resolve(SocketEventEnum.Disconnect);
      }
    });

    socketIo.on(SocketEventEnum.ConnectError, () => {
      socketIo?.disconnect();
      resolve(SocketEventEnum.ConnectError);
    });

    socketIo.on(SocketEventEnum.Disconnect, () => {
      // socket.io disconnected
      socketIo = undefined;

      resolve(SocketEventEnum.Disconnect);
    });
  });
}

export function useSocketIo() {
  return socketIo;
}
