import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.link.findMany();
  }
}
