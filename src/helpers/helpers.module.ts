import { Module } from '@nestjs/common';
import { IHelpersService } from './service/i.helpers.service';
import { HelpersService } from './service/implementation/helpers.service';

@Module({
  exports: [IHelpersService],
  providers: [
    {
      provide: IHelpersService,
      useClass: HelpersService,
    },
  ],
})
export class HelpersModule {}
