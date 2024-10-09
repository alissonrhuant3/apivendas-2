import fs from 'fs';
import path from 'path';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uploadConfig from '@config/upload';
import mime from 'mime';

export default class s3StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: 'eu-north-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    console.log(ContentType)

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    const command = new PutObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to upload file: ${error}`)
    }

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
   const command = new DeleteObjectCommand({
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    });

    try {
      await this.client.send(command);
    } catch (error) {
      throw new Error(`failed to delete file: ${error}`)
    }
  }
}
