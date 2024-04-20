import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import cloudinary from 'src/lib/cloudinary';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UploadsService {
  private readonly redisKeyPrefix = 'UPLOAD';

  constructor(private readonly redisService: RedisService) {}

  async upload(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const imagePath = `${file.fieldname}-${Date.now()}-${file.originalname}`;

    const upload = await cloudinary.uploader.upload(file.path, {
      filename_override: imagePath,
      folder: 'will-be-there',
    });

    await this.redisService
      .save(`${this.redisKeyPrefix}:${imagePath}`, upload.public_id)
      .catch((err) => console.error('Unable to save public_id to redis', err));

    return {
      url: upload.secure_url,
    };
  }

  async uploads(files: Express.Multer.File[]) {
    if (!files) throw new BadRequestException('No files uploaded');

    const mediaPromises = files.map(async (file) => {
      if (!file.mimetype.includes('image') || !file.mimetype.includes('video'))
        throw new BadRequestException('Only images and videos are allowed');
      return this.upload(file);
    });

    const results = await Promise.all(mediaPromises);

    return results.reduce((acc, result, index) => {
      acc[index] = result.url;
      return acc;
    }, {});
  }

  async delete(public_url: string) {
    // fetch image_id from redis
    const public_id = await this.redisService.get(
      `${this.redisKeyPrefix}:${public_url}`,
    );
    if (!public_id) return;

    if (typeof public_id !== 'string')
      throw new BadRequestException('Invalid public id');

    const response = await cloudinary.uploader.destroy(public_id, {
      invalidate: true,
    });
    if (response && response.result === 'not found') {
      throw new NotFoundException('Resource not found');
    }

    // delete public_url:id pair from redis
    await this.redisService.delete(public_id);

    return response;
  }
}
