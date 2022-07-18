import {
  HttpPostClient,
  HttpPostRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';
import faker from 'faker';

export class HttpPostClientSpy<RequestBody, ResponseBody>
  implements HttpPostClient<RequestBody, ResponseBody>
{
  url?: string;
  body?: RequestBody;
  response: HttpResponse<ResponseBody> = {
    statusCode: HttpStatusCode.ok,
  };

  async post({
    url,
    body,
  }: HttpPostRequest<RequestBody>): Promise<HttpResponse<ResponseBody>> {
    this.url = url;
    this.body = body;

    return Promise.resolve(this.response);
  }
}

export function mockPostRequest(): HttpPostRequest<string> {
  return {
    url: faker.internet.url(),
    body: faker.random.word(),
  };
}
