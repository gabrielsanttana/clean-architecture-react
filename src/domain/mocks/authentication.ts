import {AuthenticationParams} from '@/domain/useCases';
import faker from 'faker';
import {AccountModel} from '../models';

export function getAuthenticationParamsMock(): AuthenticationParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export function getAccountModelMock(): AccountModel {
  return {
    accessToken: faker.datatype.uuid(),
  };
}
