export class Temperature {
  value: number;

  lat: string;
  long: string;
  cityId: string;
  pressure: number;
  humidity: number;
  visibility: number;

  constructor(
    value: number,

    lat: string,
    long: string,
    cityId: string,
    pressure: number,
    humidity: number,
    visibility: number
  ) {
    this.cityId = cityId;
    this.humidity = humidity;
    this.lat = lat;
    this.long = long;
    this.value = value;

    this.pressure = pressure;
    this.visibility = visibility;
  }
}
