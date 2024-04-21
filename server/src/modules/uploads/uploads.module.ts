import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}
