// Import required AWS SDK clients and commands for Node.js.
const { PutObjectCommand, CreateBucketCommand ,HeadBucketCommand} = require("@aws-sdk/client-s3");
const { s3Client } = require("./s3Client.js");

// Set the parameters
const Bucket_Name= "stocks-bucket-1";
const params = {
  Bucket: Bucket_Name, // The name of the bucket. For example, 'sample-bucket-101'.
  Key: "sample_upload.txt", // The name of the object. For example, 'sample_upload.txt'.
  Body: "Hello World", // The content of the object. For example, 'Hello world!".
};

const run = async () => {
  // Create an Amazon S3 bucket.

    let reponse;
    try {
        // return httpStatusCode: 200 if bucket exist otherwise 404
        response = await s3Client.send(new HeadBucketCommand({ Bucket: Bucket_Name}));
        console.log("response", response);
    } catch (err){
        console.log(err);
    }

    // creating bucket if it does not exist
    if(response.$metadata.httpStatusCode == 404){
        try {
            const data = await s3Client.send(
                new CreateBucketCommand({ Bucket: params.Bucket })
            );
            console.log(data);
            console.log("Successfully created a bucket called ", data.Location);
            // return data; // For unit tests.
        }catch (err) {
            console.log("Error", err);
        }
    }
  
    // Create an object and upload it to the Amazon S3 bucket.
    try {
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
        return results; // For unit tests.
    } catch (err) {
        console.log("Error", err);
    }
};
run();

