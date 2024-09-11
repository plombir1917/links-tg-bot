import { Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotService } from './bot.service';
import { LinkService } from 'src/api/link/link.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly linkService: LinkService,
  ) {}

  @Start()
  async start(ctx: Context) {
    return await this.botService.start(ctx);
  }

  @Hears(process.env.BUTTON_GET_ALL)
  async getAll(ctx: Context) {
    const links = await this.linkService.findAll();
    await ctx.reply(
      `Список сохраненных ссылок:${links.map((link) => `\n🔗${link.id}: ${link.value}`).join('')}`,
    );
  }

  @Hears(process.env.BUTTON_GET_ONE)
  async getOne(ctx: Context) {
    await ctx.reply(`Напишите номер ссылки:`);
  }

  @On('text') async getOneLink(@Message('text') id: string, ctx: Context) {}
}
