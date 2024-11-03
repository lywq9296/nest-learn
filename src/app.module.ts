import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import Configuration from './configuration';
import * as dotenv from 'dotenv';

// const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule 在全局使用
      // envFilePath,
      load: [Configuration, () => dotenv.config({ path: '.env' })],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
