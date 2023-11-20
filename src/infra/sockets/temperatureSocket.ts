import { Socket } from 'socket.io';
1;
import ITemperatureSocket from './ITemperatureSocket';
import { Temperature } from '../../domain/entities/Temperature';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export default class TemperatureSocket implements ITemperatureSocket {
  async handleConnection(socket: Socket): Promise<void> {
    try {
      const client = new PrismaClient();
      const currentCity = await client.city.findFirst({
        select: { id: true },
      });
      setInterval(async () => {
        const temperature = {
          cityId: currentCity?.id ?? '',
          humidity: faker.number.float({ min: 20, max: 100, precision: 0.01 }),
          lat: faker.location.latitude().toString(),
          long: faker.location.longitude().toString(),
          value: faker.number.float({ min: -20, max: 50, precision: 0.01 }),
          visibility: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
          pressure: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        };
        await client.temperature.create({ data: temperature });
        socket.emit('newTemperature', { ...temperature });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

  middlewareImplementation(socket: Socket, next: any) {
    return next();
  }
}
