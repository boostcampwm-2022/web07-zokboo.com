import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';

@Injectable
export class UserRepository {
  constructor(private prisma: PrismaInstance) {}
}
