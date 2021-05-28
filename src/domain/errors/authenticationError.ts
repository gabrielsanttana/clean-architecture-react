export class AuthenticationError extends Error {
  constructor() {
    super('Authentication error. Please, try again');
    this.name = 'AuthenticationError';
  }
}
