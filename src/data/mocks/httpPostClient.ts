import {
  HttpPostClient,
  HttpPostRequest,
} from 'data/protocols/http/httpPostClient';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: Record<string, unknown>;

  async post({url, body}: HttpPostRequest): Promise<void> {
    this.url = url;
    this.body = body;

    return Promise.resolve();
  }
}
