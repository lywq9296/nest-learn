import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigEnum } from './enum/config.enum';
import * as Joi from 'joi';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule 在全局使用
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().default('1.92.101.95'),
        DB_TYPE: Joi.string().valid('mysql', 'postgres').default('mysql'),
        DB_DATABASE: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [],
          synchronize: configService.get(ConfigEnum.DB_SYNC), // 同步本地的 schema 与数据库,初始化的时候去使用
          logging: ['error'],
        }) as TypeOrmModuleAsyncOptions,
    }),
    /* TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1.92.101.95',
      port: 3306,
      username: 'root',
      password: 'Lywq@92960314',
      // database
      entities: [],
      synchronize: true, // 同步本地的 schema 与数据库,初始化的时候去使用
      logging: ['error'],
    }), */
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
