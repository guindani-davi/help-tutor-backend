import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { HelpersModule } from '../helpers/helpers.module';
import { UsersController } from './controller/implementation/users.controller';
import { IUsersRepository } from './repository/i.users.repository';
import { UsersRepository } from './repository/implementation/users.repository';
import { IUsersService } from './service/i.users.service';
import { UsersService } from './service/implementation/users.service';

@Module({
  controllers: [UsersController],
  exports: [],
  imports: [DatabaseModule, HelpersModule],
  providers: [
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IUsersService,
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
