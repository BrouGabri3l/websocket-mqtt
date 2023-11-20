export class City {
  name: string;
  state: string;
  country: string;
  maxValue: number;
  minValue: number;
  constructor(
    name: string,
    maxValue: number,
    minValue: number,
    state: string,
    country: string
  ) {
    this.country = country;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.state = state;
    this.name = name;
  }
}
