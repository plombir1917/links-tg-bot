import { Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { actionButtons } from './bot.buttons';
import { PrismaService } from 'src/database/prisma.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly prisma: PrismaService,
  ) {}

  @Start()
  async start(ctx: Context) {
    await ctx.reply(`Привет, ${ctx.from?.first_name}! ✋`);
    await ctx.reply(
      'Добро пожаловать в бота для работы со ссылками.\nЧто вы хотите сделать?',
      actionButtons(),
    );
  }

  @Hears(process.env.BUTTON_GET_ALL)
  async getAll(ctx: Context) {
    const links = await this.prisma.link.findMany();
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
