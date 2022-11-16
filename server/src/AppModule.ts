import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
