import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(url: string) {
    return await this.prisma.link.create({ data: { value: url } });
  }

  async findAll() {
    return await this.prisma.link.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.link.findUniqueOrThrow({ where: { id } });
  }

  async delete(id: string) {
    await this.prisma.link.delete({ where: { id } });
  }

  isValidUrl(url: string) {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*' + // port and path
        '(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-zA-Z\\d_]*)?$',
      'i', // fragment locator
    );
    if (!urlPattern.test(url)) throw new Error('Значение не является ссылкой.');
  }
}
