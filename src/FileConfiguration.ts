import fs from 'node:fs/promises';

import Configuration, { ConfigurationError } from './Configuration.js';

interface ConfigData {
  host: string,
  port: number
}

const DEFAULT_PORT = 8000;
const DEFAULT_HOST = '127.0.0.1';

class BadConfigurationFileFormat extends ConfigurationError {
  readonly filename: string;

  constructor(fileName: string, options?: ErrorOptions) {
    super(`Configuration file is corrupted ${fileName}`, options);

    this.filename = fileName;
  }
}

class ConfigurationFileDoesNotExists extends ConfigurationError {
  readonly filename: string;

  constructor(fileName: string, options?: ErrorOptions) {
    super(`Configuration file was not found ${fileName}`, options);

    this.filename = fileName;
  }
}

class FileConfiguration implements Configuration {
  private config: ConfigData;
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  getPort(): number {
    return this.config.port || DEFAULT_PORT;
  }

  getHost(): string {
    return this.config.host || DEFAULT_HOST;
  }

  async load() {
    return this.loadFile();
  }

  private async loadFile() {
    let contents: string;

    try {
      contents = await fs.readFile(this.fileName, { encoding: 'utf-8' });
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new ConfigurationFileDoesNotExists(this.fileName, { cause: error });
      }

      throw new ConfigurationError({ cause: error });
    }

    try {
      this.config = JSON.parse(contents);
    } catch (error) {
      throw new BadConfigurationFileFormat(this.fileName, { cause: error });
    }
  }
}

export default FileConfiguration;
export { BadConfigurationFileFormat, ConfigurationFileDoesNotExists };
