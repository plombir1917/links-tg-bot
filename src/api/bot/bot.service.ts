import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { actionButtons } from './bot.buttons';
import { LinkService } from '../link/link.service';

@Injectable()
export class BotService {
  constructor(private readonly linkService: LinkService) {}

  async start(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.from?.first_name}! ✋`);
    await ctx.reply(
      'Добро пожаловать в бота для работы со ссылками.\nЧто вы хотите сделать?',
      actionButtons(),
    );
  }

  async createLink(url: string, ctx: Context) {
    try {
      const link = await this.linkService.create(url);
      await ctx.reply(`Ссылка создана, ей присвоен код:\n${link.id}`);
    } catch (error) {
      await ctx.reply('Ссылка не создана.');
    }
  }

  async findAll(ctx: Context) {
    const links = await this.linkService.findAll();
    await ctx.reply(
      `Список сохраненных ссылок:${links.map((link) => `\n🔗${link.id}: ${link.value}`).join('')}`,
    );
  }

  async findOne(id: string, ctx: Context) {
    try {
      const link = await this.linkService.findOne(id);
      await ctx.reply(`🔗${link.id}: ${link.value}`);
    } catch (error) {
      await ctx.reply('Ссылка не найдена.');
    }
  }

  async delete(id: string, ctx: Context) {
    try {
      await this.linkService.delete(id);
      await ctx.reply('Ссылка удалена.');
    } catch (error) {
      await ctx.reply('Ссылка не найдена.');
    }
  }
}
