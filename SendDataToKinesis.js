const {PutRecordCommand , CreateStreamCommand,DescribeStreamSummaryCommand} = require("@aws-sdk/client-kinesis");
const { kinesisClient } = require("./kinesisClient.js");
const {getStocksData} = require("./stocks_data.js");



const checkStreamExists = async (streamName) => {
    try {
      const command = new DescribeStreamSummaryCommand({ StreamName: streamName });
      const response = await kinesisClient.send(command);
      console.log(`Stream '${streamName}' exists.`);
      return true;
    } catch (error) {
      if (error.name === 'ResourceNotFoundException') {
        console.log(`Stream '${streamName}' does not exist.`);
        return false;
      }
      console.error(error);
      throw error;
    }
};

const createKinesisStream = async (streamName, shardCount) =>{
    try {
        const command = new CreateStreamCommand({ StreamName: streamName, ShardCount: shardCount });
        await kinesisClient.send(command);
        console.log(`Stream '${streamName}' created successfully.`);
      } catch (error) {
        console.error(error);
        throw error;
      } 
}

const sendToKinesis = async (streamName,payload, partitionKey) => {
    
    const params = {
        Data: Buffer.from(JSON.stringify(payload)),
        PartitionKey: partitionKey,
        StreamName: streamName,
    };
    try {
        const response = await kinesisClient.send(new PutRecordCommand(params));
        console.log(`Data sent successfully. Shard ID: ${response.ShardId}, Sequence Number: ${response.SequenceNumber}`);
    } catch (error) {
        console.log("error ::: " + error);
    }
}


const handleKinesisdata = async()=>{
    try{
        const kinesis_stream_name= "stock-stream-123"
        const doesStreamExist = await checkStreamExists(kinesis_stream_name);

        console.log("doesStreamExist ",doesStreamExist);
        if(!doesStreamExist)createKinesisStream(kinesis_stream_name,1);

        const stocks_data = await getStocksData();
        const key = "stocks-key-123";

        await sendToKinesis(kinesis_stream_name,stocks_data,key);
    }catch(e){
        console.log("handleKinesisdata ::", e);
    }
    
}

handleKinesisdata();
