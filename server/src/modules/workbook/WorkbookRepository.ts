import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';

@Injectable()
export class WorkbookRepository {
  constructor(private readonly prisma: PrismaInstance) {}
}
