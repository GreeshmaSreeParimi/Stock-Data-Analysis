const { S3Client } = require("@aws-sdk/client-s3");
// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"

// acess credentials
const credentials= {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
}
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION, credentials:credentials});
module.exports = { s3Client };