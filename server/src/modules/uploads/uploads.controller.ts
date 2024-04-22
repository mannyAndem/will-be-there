import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@Controller('uploads')
@ApiTags('uploads')
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('media'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    description: 'The image to be uploaded',
  })
  @ApiCreatedResponse({
    schema: {
      example: {
        imageUrl: 'upload.secure_url',
        cloudinaryId: 'upload.public_id',
      },
    },
    description: 'Image uploaded',
  })
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.uploadsService.upload(file);
  }

  @Post('uploads')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    required: true,
    description: 'The images to be uploaded',
  })
  @ApiCreatedResponse({
    schema: {
      example: [
        {
          imageUrl: 'upload.secure_url',
          cloudinaryId: 'upload.public_id',
        },
      ],
    },
    description: 'Images uploaded',
  })
  @UseInterceptors(FileInterceptor('media'))
  async uploads(@UploadedFiles() files: Express.Multer.File[]) {
    return this.uploadsService.uploads(files);
  }
}
