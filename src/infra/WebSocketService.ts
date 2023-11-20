import { Server, Socket } from 'socket.io';
import * as http from 'http';
const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST'],
};

class WebsocketService extends Server {
  private static io: WebsocketService;

  constructor(httpServer: http.Server) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer: http.Server): WebsocketService {
    if (!WebsocketService.io) {
      WebsocketService.io = new WebsocketService(httpServer);
    }

    return WebsocketService.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = WebsocketService.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default WebsocketService;
