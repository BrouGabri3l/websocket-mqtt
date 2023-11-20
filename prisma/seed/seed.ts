import { PrismaClient } from '@prisma/client';
import { CitySeed } from './CitySeed';
import { TemperatureSeed } from './TemperatureSeed';

const prisma = new PrismaClient();

async function main() {
  console.log('staring seeding');

  await CitySeed.run(prisma);
  await TemperatureSeed.run(prisma);
  console.log('finishing');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
