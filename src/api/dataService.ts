import { HttpClient } from "./fetchHttpClient";

export class DataService {
  private httpClient: HttpClient;
  private countryCode: string;

  constructor(httpClient: HttpClient, countryCode = "ru") {
    this.httpClient = httpClient;
    this.countryCode = countryCode;
  }

  async getDayOffDays(year: number, countryCode = "ru"): Promise<string[]> {
    const url = `https://isdayoff.ru/api/getdata?year=${year}&cc=${countryCode}`;
    return await this.httpClient
      .getTextData(url)
      .then((response) => response.split(""));
  }
}
