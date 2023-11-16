import { ITemperatureRepository } from '../../../domain/Repositories/ITemperatureRepository';
import { Temperature } from '../../../domain/entities/Temperature';
import prisma from '../client';
interface ITemperatureRepositorySaveParams {
  value: number;
  maxValue: number;
  minValue: number;
  lat: string;
  long: string;
  cityId: string;
  pressure: number;
  humidity: number;
  visibility: number;
}

export class TemperatureRepository implements ITemperatureRepository {
  constructor() {}

  async save(params: ITemperatureRepositorySaveParams): Promise<void | Error> {
    try {
      await prisma.temperature.create({ data: params });
    } catch (error) {
      return new Error('Ocorreu um erro');
    }
  }
  async getLatest(): Promise<Error | Temperature[]> {
    try {
      const result = await prisma.temperature.findMany({ take: 10 });
      return result;
    } catch (error) {
      return new Error('Ocorreu um erro');
    }
  }
}
