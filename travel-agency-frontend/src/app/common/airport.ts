export class Airport {
  id: number;
  name: string;
  code: string;
  city: string;
  country: string;

  constructor(id: number, name: string, code: string, city: string, country: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.city = city;
    this.country = country;
  }
}
