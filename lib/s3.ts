import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});

const AWS_BUCKET: string = process.env.AWS_BUCKET as string;
const AWS_BUCKET_FILENAME: string = process.env.AWS_BUCKET_FILENAME as string;

export type ReadParams = { key?: string, bucket?: string };
export type ReadResult = Array<{ name_ar: string, population: number }>;

export async function read({ 
  bucket = AWS_BUCKET, 
  key = AWS_BUCKET_FILENAME,
}: ReadParams = { bucket: AWS_BUCKET, key: AWS_BUCKET_FILENAME }): Promise<ReadResult> {
  const params = {
    Bucket: bucket,
    Key: key
  };

  const response = await client.send(new GetObjectCommand(params));

  const body = await response.Body?.transformToString() || '[]';

  return JSON.parse(body);
}

export type UpdateParams = { bucket?: string, key?: string, body: { name_ar: string, population: string }[] | string };

export async function update({ 
  bucket = AWS_BUCKET, 
  key = AWS_BUCKET_FILENAME,
  body
}: UpdateParams) {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: typeof body === 'string' ? body : JSON.stringify(body)
  };

  return await client.send(new PutObjectCommand(params));
}
