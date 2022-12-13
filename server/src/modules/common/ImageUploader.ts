import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageUploader {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      endpoint: this.configService.get<string>('BUCKET_URL'),
      region: 'kr-standard',
      credentials: {
        accessKeyId: this.configService.get<string>('NCP_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('NCP_SECRET_ACCESS_KEY'),
      },
    });
  }

  public async uploadImage(file: Express.Multer.File) {
    const key = `${+new Date()}-${file.originalname}`;
    const response = await this.s3
      .putObject({
        Bucket: 'zokboo-bucket',
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    if (response.$response.error) {
      throw new InternalServerErrorException(response.$response.error.message);
    }

    const fullURI = `${this.configService.get<string>('BUCKET_URL')}/zokboo-bucket/${key}`;

    return { path: fullURI };
  }
}
