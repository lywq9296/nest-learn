import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import * as merge from 'lodash.merge';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';

const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);
const envPath = join(
  __dirname,
  '../config',
  `config.${process.env.NODE_ENV}.yml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf-8'));
const envConfig = yaml.load(readFileSync(envPath, 'utf-8'));

// ConfigModule有一个 load 方法
export default () => merge(commonConfig, envConfig);
