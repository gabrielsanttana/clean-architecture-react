import {HttpPostClientSpy} from '@/data/mocks';
import {HttpStatusCode} from '@/data/protocols/http';
import {AuthenticationError, InvalidCredentialsError} from '@/domain/errors';
import {
  getAccountModelMock,
  getAuthenticationParamsMock,
} from '@/domain/mocks/authentication';
import {AccountModel} from '@/domain/models';
import {AuthenticationParams} from '@/domain/useCases';
import faker from 'faker';
import {RemoteAuthentication} from './remoteAuthentication';

interface SutTypes {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
}

function makeSut(url = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy,
  };
}

describe('The RemoteAuthentication module', () => {
  it('calls the HTTPClient with correct URL', async () => {
    const url = faker.internet.url();
    const authenticationParamsMock = getAuthenticationParamsMock();

    const {sut, httpPostClientSpy} = makeSut(url);

    await sut.auth(authenticationParamsMock);

    expect(httpPostClientSpy.url).toBe(url);
  });

  it('calls the HTTPClient with correct body', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();

    await sut.auth(authenticationParamsMock);

    expect(httpPostClientSpy.body).toEqual(authenticationParamsMock);
  });

  it('throws InvalidCrendetialsError when HttpPostClient returns status 401', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(authenticationParamsMock);

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it('throws AuthenticationError when HttpPostClient returns status 400', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.auth(authenticationParamsMock);

    await expect(promise).rejects.toThrow(new AuthenticationError());
  });

  it('throws AuthenticationError when HttpPostClient returns status 404', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.auth(authenticationParamsMock);

    await expect(promise).rejects.toThrow(new AuthenticationError());
  });

  it('throws AuthenticationError when HttpPostClient returns status 500', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.auth(authenticationParamsMock);

    await expect(promise).rejects.toThrow(new AuthenticationError());
  });

  it('returns an AccountModel when HttpPostClient returns 200', async () => {
    const {sut, httpPostClientSpy} = makeSut();

    const authenticationParamsMock = getAuthenticationParamsMock();
    const accountModelMock = getAccountModelMock();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: accountModelMock,
    };

    const account = await sut.auth(authenticationParamsMock);

    expect(account).toEqual(accountModelMock);
  });
});
