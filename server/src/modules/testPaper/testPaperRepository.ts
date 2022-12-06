import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';

@Injectable()
export class testPaperRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}
}
