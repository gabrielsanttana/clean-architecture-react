import {HttpPostClient} from 'data/protocols/http/httpPostClient';
import {RemoteAuthentication} from './remoteAuthentication';

describe('The RemoteAuthentication module', () => {
  it('calls the HTTPClient with correct URL', () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;

        return Promise.resolve();
      }
    }

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
