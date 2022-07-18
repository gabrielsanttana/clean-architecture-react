import {mockPostRequest} from '@/data/mocks';
import {mockAxios} from '@/infra/mocks';
import axios from 'axios';
import {AxiosHttpClient} from '.';

interface SutType {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
}

function makeSut(): SutType {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  };
}

jest.mock('axios');

describe('The axiosHttpClient module', () => {
  it('calls axios with correct values in post request', async () => {
    const mockedRequest = mockPostRequest();
    const {sut, mockedAxios} = makeSut();

    await sut.post(mockedRequest);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      mockedRequest.url,
      mockedRequest.body,
    );
  });

  it('returns the correct data in post response', async () => {
    const {sut, mockedAxios} = makeSut();
    const mockedRequest = mockPostRequest();
    const mockedResponse = mockedAxios.post.mock.results[0].value;

    const response = sut.post(mockedRequest);

    expect(response).toEqual(mockedResponse);
  });
});
