import {HttpPostRequest} from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import {AxiosHttpClient} from '.';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  status: faker.datatype.number(200),
  body: faker.datatype.json(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

function makeSut(): AxiosHttpClient {
  return new AxiosHttpClient();
}

function mockPostRequest(): HttpPostRequest<any> {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement(),
  };
}

describe('The axiosHttpClient module', () => {
  it('calls axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();

    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
