require('dotenv').config({ path: [__dirname, '..', '.env.local'].join('/') });
const { S3Client, HeadObjectCommand, CreateBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const seed = require('./seed/countries.json');

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

const AWS_BUCKET = process.env.AWS_BUCKET;
const AWS_BUCKET_FILENAME = process.env.AWS_BUCKET_FILENAME;

async function bootstrap() {
  const params = {
    Bucket: AWS_BUCKET,
    Key: AWS_BUCKET_FILENAME
  };

  try {
    await client.send(new HeadObjectCommand(params));

    console.log('bucket and data file already exist');
  } catch (err) {
    if (err.name !== 'NotFound') throw new Error(err);

    await client.send(new CreateBucketCommand({ Bucket: AWS_BUCKET }));
    await client.send(new PutObjectCommand({
      ...params,
      Body: JSON.stringify(seed)
    }));

    console.log('created new bucket and seeded initial data');
  }
}

console.log('bootstrapping...');
bootstrap();