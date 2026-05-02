import Configuration from '../src/Configuration.js';

class TestConfiguration implements Configuration {
  private port = 5050;
  private host = 'localhost';
  private token = 'test-token';
  private tokenLen = 64;

  getPort(): number {
    return this.port;
  }

  getHost(): string {
    return this.host;
  }

  getAuthorizationToken(): string {
    return this.token;
  }

  getAuthorizationTokenLen(): number {
    return this.tokenLen;
  }
}

export default TestConfiguration;
