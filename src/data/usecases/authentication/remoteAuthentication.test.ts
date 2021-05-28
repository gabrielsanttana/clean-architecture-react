import {HttpPostClientSpy} from '@/data/mocks/httpPostClient';
import {HttpStatusCode} from '@/data/protocols/http/httpResponse';
import {AuthenticationError} from '@/domain/errors/authenticationError';
import {InvalidCredentialsError} from '@/domain/errors/invalidCredentialsError';
import {getAuthenticationMock} from '@/domain/mocks/authentication';
import faker from 'faker';
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
    const authenticationMock = getAuthenticationMock();

    const {sut, httpPostClientSpy} = makeSut(url);

    await sut.auth(authenticationMock);

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('calls the HTTPClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationMock = getAuthenticationMock();

    await sut.auth(authenticationMock);

    expect(httpPostClientSpy.body).toEqual(authenticationMock);
  });

  it('throws InvalidCrendetialsError when HttpPostClient returns status 401', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationMock = getAuthenticationMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(authenticationMock);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('throws AuthenticationError when HttpPostClient returns status 400', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationMock = getAuthenticationMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.auth(authenticationMock);

    await expect(promise).rejects.toThrow(new AuthenticationError());
  });
});
