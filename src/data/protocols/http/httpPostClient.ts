import {HttpResponse} from '.';

export type HttpPostRequest<Body> = {
  url: string;
  body?: Body;
};

export interface HttpPostClient<RequestBody, ResponseBody> {
  post(
    request: HttpPostRequest<RequestBody>,
  ): Promise<HttpResponse<ResponseBody>>;
}
