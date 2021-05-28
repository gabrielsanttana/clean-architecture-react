import {HttpResponse} from './httpResponse';

export type HttpPostRequest = {
  url: string;
  body?: Record<string, unknown>;
};

export interface HttpPostClient {
  post(request: HttpPostRequest): Promise<HttpResponse>;
}
