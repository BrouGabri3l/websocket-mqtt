import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
export class TemperatureSeed {
  static async run(client: PrismaClient): Promise<void> {
    const temperatures = await client.temperature.findMany();

    if (!temperatures.length) {
      await this.storeTemperatures(client);
      return;
    }
    console.log(`temperatures collection is not empty`);
  }
  private static async storeTemperatures(client: PrismaClient): Promise<void> {
    const currentCity = await client.city.findFirst({ select: { id: true } });
    for (const iterator of Array.from({ length: 100 })) {
      await client.temperature.create({
        data: {
          cityId: currentCity?.id ?? '',
          humidity: faker.number.float({ min: 20, max: 100, precision: 0.01 }),
          lat: faker.location.latitude().toString(),
          long: faker.location.longitude().toString(),
          value: faker.number.float({ min: -20, max: 50, precision: 0.01 }),
          visibility: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
          pressure: faker.number.float({ min: 0, max: 100, precision: 0.01 }),
        },
        include: { city: true },
      });
    }
  }
}
