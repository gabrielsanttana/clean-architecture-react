import {AuthenticationParams} from 'domain/usecases/authentication';
import faker from 'faker';

export const getAuthenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
