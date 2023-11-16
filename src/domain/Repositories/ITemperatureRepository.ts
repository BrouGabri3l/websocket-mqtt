import { Temperature } from '../entities/Temperature';

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

export interface ITemperatureRepository {
  save: (params: ITemperatureRepositorySaveParams) => Promise<void | Error>;
  getLatest: () => Promise<Temperature[] | Error>;
}
