import httpClient from '../httpClient/httpClient';

export default class ChartServiceImpl {
  private httpClient;

  constructor(httpClient: httpClient) {
    this.httpClient = httpClient;
  }

  async get() {
    const response = await this.httpClient.fetch('/mock_data.json');
    return await response.json();
  }
}
