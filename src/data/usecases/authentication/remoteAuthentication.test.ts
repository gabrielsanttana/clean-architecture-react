import {HttpPostClientSpy} from '../../mocks/httpClient';
import {RemoteAuthentication} from './remoteAuthentication';

describe('The RemoteAuthentication module', () => {
  it('calls the HTTPClient with correct URL', () => {
    const url = 'https://google.com.br';
    const httpPostClientSpy = new HttpPostClientSpy();

    const remoteAuthentication = new RemoteAuthentication(
      url,
      httpPostClientSpy,
    );

    remoteAuthentication.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});
