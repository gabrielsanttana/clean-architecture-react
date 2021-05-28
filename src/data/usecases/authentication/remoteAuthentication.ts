import {HttpStatusCode} from '@/data/protocols/http/httpResponse';
import {AuthenticationError} from '@/domain/errors/authenticationError';
import {InvalidCredentialsError} from '@/domain/errors/invalidCredentialsError';
import {HttpPostClient} from 'data/protocols/http/httpPostClient';
import {AuthenticationParams} from 'domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(request: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: request,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        break;

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();

      default:
        throw new AuthenticationError();
    }
  }
}
