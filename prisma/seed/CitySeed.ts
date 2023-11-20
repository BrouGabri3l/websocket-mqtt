import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export class CitySeed {
  static async run(client: PrismaClient): Promise<void> {
    const clients = await client.city.findMany();

    if (!clients.length) {
      await this.storeCity(client);
      return;
    }
    console.log(`The city collection is not empty`);
  }
  private static async storeCity(client: PrismaClient): Promise<void> {
    await client.city.create({
      data: {
        country: 'Brazil',
        name: 'Franca',
        state: 'SP',
        maxValue: faker.number.float({ min: -20, max: 50, precision: 0.01 }),
        minValue: faker.number.float({ min: -20, max: 50, precision: 0.01 }),
      },
    });
  }
}
