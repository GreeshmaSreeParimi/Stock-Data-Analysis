const { KinesisClient, PutRecordCommand } = require("@aws-sdk/client-kinesis");
require('dotenv').config();

const REGION = "us-west-2"; //e.g. "us-east-1"
const credentials= {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
}

const kinesisClient = new KinesisClient({ region: REGION, credentials:credentials});
module.exports = { kinesisClient };