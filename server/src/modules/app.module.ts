import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '../app.service';
import { AppController } from '../controllers/app.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
