import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
// import { ConfigModule } from '@nestjs/config'; // 局部引入

@Module({
  imports: [
    // ConfigModule.forRoot(), // 局部引入
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
