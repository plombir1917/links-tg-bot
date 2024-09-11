import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [LinkModule, BotModule],
})
export class ApiModule {}
