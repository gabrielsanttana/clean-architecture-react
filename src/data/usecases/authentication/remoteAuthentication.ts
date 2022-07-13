import {HttpPostClient, HttpStatusCode} from '@/data/protocols/http';
import {AuthenticationError, InvalidCredentialsError} from '@/domain/errors';
import {AccountModel} from '@/domain/models';
import {AuthenticationParams} from '@/domain/useCases';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >,
  ) {}

  async auth(request: AuthenticationParams): Promise<AccountModel | undefined> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: request,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();

      default:
        throw new AuthenticationError();
    }
  }
}
