import { Module } from '@nestjs/common';
import { CommonController } from './controllers/common.controller';

@Module({
  imports: [],
  controllers: [CommonController],
  providers: [],
})
export class CommonModule {}
