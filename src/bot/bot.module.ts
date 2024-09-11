import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { BotUpdate } from './bot.update';
import { PrismaModule } from 'src/database/prisma.module';

const session = new LocalSession({
  database: 'sessions.json',
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRoot({
      // middlewares: [session.middleware()],
      token: process.env.BOT_TOKEN,
    }),
    PrismaModule,
  ],
  providers: [BotUpdate],
})
export class BotModule {}
