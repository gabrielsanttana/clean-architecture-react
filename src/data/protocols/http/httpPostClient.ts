import {HttpResponse} from '.';

export interface HttpPostRequest<BodyType> {
  url: string;
  body?: BodyType;
}

export interface HttpPostClient<RequestBodyType, ResponseBodyType> {
  post(
    request: HttpPostRequest<RequestBodyType>,
  ): Promise<HttpResponse<ResponseBodyType>>;
}
