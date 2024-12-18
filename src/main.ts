import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';
const dbConfig = config.get('db');
console.log(dbConfig, process.env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
