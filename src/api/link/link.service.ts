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
}
