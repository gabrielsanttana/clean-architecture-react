import {
  HttpPostClient,
  HttpPostRequest,
} from 'data/protocols/http/httpPostClient';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post(request: HttpPostRequest): Promise<void> {
    this.url = request.url;

    return Promise.resolve();
  }
}
