import {
  HttpPostClient,
  HttpPostRequest,
  HttpResponse,
} from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(request: HttpPostRequest<any>): Promise<HttpResponse<any>> {
    const response = await axios.post(request.url, request.body);

    return {
      statusCode: response.status,
      body: response.data,
    };
  }
}
