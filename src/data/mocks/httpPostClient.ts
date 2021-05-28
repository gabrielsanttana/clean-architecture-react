import {
  HttpPostClient,
  HttpPostRequest,
} from 'data/protocols/http/httpPostClient';
import {HttpResponse, HttpStatusCode} from '../protocols/http/httpResponse';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: Record<string, unknown>;
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };

  async post({url, body}: HttpPostRequest): Promise<HttpResponse> {
    this.url = url;
    this.body = body;

    return Promise.resolve(this.response);
  }
}
