import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { ConfigEnum } from './enum/config.enum';

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
      validationSchema: Joi.object({
        [ConfigEnum.DB_PORT]: Joi.number()
          .valid(3306, 3307, 3308)
          .default(3306),
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
