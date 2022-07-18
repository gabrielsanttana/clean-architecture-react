import {HttpPostRequest} from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import {AxiosHttpClient} from '.';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResponse = {
  status: faker.datatype.number(200),
  data: faker.datatype.json(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

function makeSut(): AxiosHttpClient {
  return new AxiosHttpClient();
}

function mockPostRequest(): HttpPostRequest<string> {
  return {
    url: faker.internet.url(),
    body: faker.random.word(),
  };
}

describe('The axiosHttpClient module', () => {
  it('calls axios with correct values in post request', async () => {
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('returns the correct data in post response', async () => {
    const sut = makeSut();
    const request = mockPostRequest();

    const response = await sut.post(request);

    expect(response).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data,
    });
  });
});
