export default class HttpClientImpl {
  private baseURL;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async fetch(endPoint: string, options = {}) {
    const response = await window.fetch(this.baseURL + endPoint, {
      ...options,
    });

    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  }
}
