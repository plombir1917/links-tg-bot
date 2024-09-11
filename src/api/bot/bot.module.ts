import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { BotUpdate } from './bot.update';
import { LinkModule } from 'src/api/link/link.module';
import { BotService } from './bot.service';

// const session = new LocalSession({
//   database: 'sessions.json',
// });

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRoot({
      // middlewares: [session.middleware()],
      token: process.env.BOT_TOKEN,
    }),
    LinkModule,
  ],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
