import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

const envFilePath = `.env.${process.env.NODE_ENV}` || '.env';

@Module({
  imports: [
    /* 全局导入 */
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      ignoreEnvFile: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
