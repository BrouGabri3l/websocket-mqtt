import http from 'http';
import { AddressInfo } from 'net';
import WebsocketService from './infra/WebSocketService';
import TemperatureSocket from './infra/sockets/temperatureSocket';
import { createServer } from './config/express';
const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://broker.hivemq.com');

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ?? '8080';

const startServer = async () => {
  const app = await createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const adressInfo = server.address() as AddressInfo;
    console.log(
      `Server ready at http://${adressInfo.address}:${adressInfo.port}`
    );
  });

  const io = WebsocketService.getInstance(server);
  io.initializeHandlers([
    { path: '/temperatures', handler: new TemperatureSocket() },
  ]);

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log('HTTP Server closed');
      });
    });
  });
};

startServer();

// Evento chamado quando a conexão é estabelecida
// client.on('connect', () => {
//   console.log('Conectado ao broker MQTT');

//   // Subscreva ao tópico desejado
// });

// // Evento chamado quando uma mensagem é recebida
// client.on('message', (topic, message) => {
//   console.log(`Mensagem recebida no tópico ${topic}: ${message.toString()}`);
// });

// // Evento chamado quando a conexão é encerrada
// client.on('close', () => {
//   console.log('Conexão encerrada');
// });

// // Evento chamado em caso de erro
// client.on('error', (error) => {
//   console.error('Erro:', error);
// });
