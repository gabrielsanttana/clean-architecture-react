import faker from 'faker';
import {mockAuthentication} from '../../../domain/mocks/authentication';
import {HttpPostClientSpy} from '../../mocks/httpPostClient';
import {RemoteAuthentication} from './remoteAuthentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
};

describe('The RemoteAuthentication module', () => {
  it('calls the HTTPClient with correct URL', async () => {
    const url = faker.internet.url();
    const authenticationMock = mockAuthentication();

    const {sut, httpPostClientSpy} = makeSut(url);

    await sut.auth(authenticationMock);

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('calls the HTTPClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationMock = mockAuthentication();

    await sut.auth(authenticationMock);

    expect(httpPostClientSpy.body).toEqual(authenticationMock);
  });
});
