export type HttpPostRequest = {
  url: string;
};

export interface HttpPostClient {
  post(request: HttpPostRequest): Promise<void>;
}
