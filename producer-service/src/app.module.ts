import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [Logger],
})
export class AppModule {}
