import axios from 'axios';
import faker from 'faker';

export function mockAxios(): jest.Mocked<typeof axios> {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedAxiosResponse = {
    status: faker.datatype.number(200),
    data: faker.datatype.json(),
  };
  mockedAxios.post.mockResolvedValue(mockedAxiosResponse);

  return mockedAxios;
}
