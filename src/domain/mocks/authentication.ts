import {AuthenticationParams} from 'domain/usecases';
import faker from 'faker';
import {AccountModel} from '../models';

export const getAuthenticationParamsMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const getAccountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
});
