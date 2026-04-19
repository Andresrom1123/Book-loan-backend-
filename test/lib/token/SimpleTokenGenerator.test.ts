import { expect } from 'chai';

import SimpleTokenGenerator from '../../../src/lib/token/SimpleTokenGenerator.js';

describe('SimpleTokenGenerator', () => {
  describe('#generate', () => {
    it('should generate a token with the correct length', () => {
      const generator = new SimpleTokenGenerator(32);

      expect(generator.generate()).to.have.length(32);
    });

    it('should generate a token with only alphanumeric characters', () => {
      const generator = new SimpleTokenGenerator(64);
      const token = generator.generate();

      expect(token).to.match(/^[A-Za-z0-9]+$/);
    });

    it('should generate different tokens on consecutive calls', () => {
      const generator = new SimpleTokenGenerator(32);

      expect(generator.generate()).to.not.be.equal(generator.generate());
    });

    it('should generate an empty string when length is 0', () => {
      const generator = new SimpleTokenGenerator(0);

      expect(generator.generate()).to.be.equal('');
    });
  });
});
