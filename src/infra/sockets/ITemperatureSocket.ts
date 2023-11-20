import { Socket } from 'socket.io';

interface ITemperatureSocket {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: any): void;
}
export default ITemperatureSocket
