import fs from 'node:fs/promises';

import sinon from 'sinon';
import { expect } from 'chai';

import FileConfiguration, {
  BadConfigurationFileFormat,
  ConfigurationFileDoesNotExists
} from '../src/FileConfiguration.js';
import { ConfigurationError } from '../src/Configuration.js';

function buildFixtureName(name: string) {
  return `${import.meta.dirname}/fixtures/${name}.json`;
}

describe('#FileConfiguration', () => {
  let sandbox: ReturnType<typeof sinon.createSandbox>;

  beforeEach(() => sandbox = sinon.createSandbox());

  afterEach(() => sandbox.restore());

  it('should load the server port', async () => {
    const config = new FileConfiguration(buildFixtureName('config'));

    await config.load();

    expect(config.getPort()).to.be.equal(8002);
    expect(config.getHost()).to.be.equal('127.0.0.1');
  });

  it('should load the server port when the port is not in the configuration', async () => {
    const config = new FileConfiguration(buildFixtureName('config.empty'));

    await config.load();

    expect(config.getPort()).to.be.equal(8000);
  });

  it('should throw an error when the config is not a valid JSON', async () => {
    const config = new FileConfiguration(buildFixtureName('config.invalid'));

    await expect(config.load()).to.be.rejectedWith(BadConfigurationFileFormat);
  });

  it('should throw an error when the file does not exist', async () => {
    const config = new FileConfiguration(buildFixtureName('config.not-exist'));

    await expect(config.load()).to.be.rejectedWith(ConfigurationFileDoesNotExists);
  });

  it('should throw an error when an unexpected error occurs', async () => {
    sandbox
      .stub(fs, 'readFile')
      .throws(new Error('Fake error'));

    const config = new FileConfiguration(buildFixtureName('config'));

    await expect(config.load()).to.be.rejectedWith(ConfigurationError);
  });
});
