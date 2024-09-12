import { Ctx, Hears, Message, On, Start, Update } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Context } from './interface/context.interface';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async start(ctx: Context) {
    return await this.botService.start(ctx);
  }

  @Hears(process.env.BUTTON_SAVE)
  async save(ctx: Context) {
    await ctx.reply(`Напишите ссылку:`);
    ctx.session = { type: 'save' };
  }

  @Hears(process.env.BUTTON_GET_ALL)
  async getAll(ctx: Context) {
    ctx.session = { type: 'getAll' };
    return await this.botService.findAll(ctx);
  }

  @Hears(process.env.BUTTON_GET_ONE)
  async getOne(ctx: Context) {
    await ctx.reply(`Напишите код ссылки:`);
    ctx.session = { type: 'get' };
  }

  @Hears(process.env.BUTTON_DELETE)
  async delete(ctx: Context) {
    await ctx.reply(`Напишите код ссылки:`);
    ctx.session = { type: 'delete' };
  }

  @On('text') async getMessage(
    @Message('text') value: string,
    @Ctx() ctx: Context,
  ) {
    switch (ctx.session.type) {
      case 'save':
        return await this.botService.createLink(value, ctx);
      case 'get':
        return await this.botService.findOne(value, ctx);
      case 'delete':
        return await this.botService.delete(value, ctx);
    }
  }
}
