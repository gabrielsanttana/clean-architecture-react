import faker from 'faker';
import {HttpPostClientSpy} from '../../mocks/httpClient';
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
    const url = 'https://google.com.br';

    const {sut, httpPostClientSpy} = makeSut(url);

    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
