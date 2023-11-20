import { ITemperatureRepository } from '../Repositories/ITemperatureRepository';

interface ISaveTemperatureParams {
  value: number;
  lat: string;
  long: string;
  cityId: string;
  pressure: number;
  humidity: number;
  visibility: number;
}

export class SaveTemperatureUseCase {
  constructor(private readonly temperatureRepository: ITemperatureRepository) {}

  async execute(params: ISaveTemperatureParams): Promise<void | Error> {
    try {
      await this.temperatureRepository.save(params);

      return;
    } catch (error) {
      return new Error();
    }
  }
}
