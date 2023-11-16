import { ITemperatureRepository } from '../Repositories/ITemperatureRepository';
import { Temperature } from '../entities/Temperature';

export class GetLatestTemperaturesUseCase {
  constructor(private readonly temperatureRepository: ITemperatureRepository) {}
  async execute(): Promise<Temperature[] | Error> {
    try {
      const result = await this.temperatureRepository.getLatest();
      return result;
    } catch (error) {
      return new Error();
    }
  }
}
