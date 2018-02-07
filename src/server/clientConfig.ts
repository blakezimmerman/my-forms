import { host } from './app';

export interface ClientConfig {
  host: string;
}

const devConfig: ClientConfig = {
  host
};

const prodConfig: ClientConfig = {
  host
};

const config = process.env.NODE_ENV === 'prod'
  ? prodConfig
  : devConfig;

export default config;
