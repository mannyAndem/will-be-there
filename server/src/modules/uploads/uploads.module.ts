import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  providers: [UploadsService],
  controllers: [UploadsController],
  imports: [
    MulterModule.register({
      dest: `./uploads`,
    }),
  ],
})
export class UploadsModule {}
