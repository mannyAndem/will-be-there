import { BadRequestException, Injectable } from '@nestjs/common';
import { unlink } from 'fs/promises';
import cloudinary from 'src/lib/cloudinary';

@Injectable()
export class UploadsService {
  constructor() {}

  async upload(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const imagePath = `${file.fieldname}-${Date.now()}-${file.originalname}`;

    const upload = await cloudinary.uploader.upload(file.path, {
      filename_override: imagePath,
      folder: 'will-be-there',
    });

    // delete image after upload
    await unlink(file.path).catch((err) => {
      console.log('Unable to delete image after upload', err);
    });

    return {
      imageUrl: upload.secure_url,
      cloudinaryId: upload.public_id,
    };
  }

  async uploads(files: Express.Multer.File[]) {
    if (!files) throw new BadRequestException('No files uploaded');

    const mediaPromises = files.map(async (file) => {
      if (!file.mimetype.includes('image') && !file.mimetype.includes('video'))
        throw new BadRequestException('Only images and videos are allowed');
      return this.upload(file);
    });

    const results = await Promise.all(mediaPromises);

    return results;
  }

  async delete(cloudinaryId: string) {
    return cloudinary.uploader.destroy(cloudinaryId);
  }
}
