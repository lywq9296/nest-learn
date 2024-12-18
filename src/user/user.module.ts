import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [ConfigModule.forRoot()], // 模块中局部导入
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
