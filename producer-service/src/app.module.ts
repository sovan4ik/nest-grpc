import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [ConfigModule, CommonModule,
     UsersModule],
  providers: [Logger],
})
export class AppModule {}
