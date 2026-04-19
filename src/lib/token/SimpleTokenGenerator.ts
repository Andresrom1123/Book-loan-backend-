import TokenGenerator from './TokenGenerator.js';

class SimpleTokenGenerator implements TokenGenerator {
  private len: number;

  constructor(len: number) {
    this.len = len;
  }

  generate(): string {
    let result = '';

    for (let index = 0; index < this.len; index++) {
      result += this.randomCharacter();
    }

    return result;
  }

  private randomCharacter(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomIndex = Math.floor(Math.random() * characters.length);

    return characters[randomIndex];
  }
}

export default SimpleTokenGenerator;
