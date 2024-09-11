import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { actionButtons } from './bot.buttons';

@Injectable()
export class BotService {
  async start(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.from?.first_name}! ✋`);
    await ctx.reply(
      'Добро пожаловать в бота для работы со ссылками.\nЧто вы хотите сделать?',
      actionButtons(),
    );
  }
}
