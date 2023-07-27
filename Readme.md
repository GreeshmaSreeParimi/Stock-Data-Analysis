This is a Stock Data Analysis project.
It takes today's live data and compares it with previous years' data and sends notifications to subscribers who subscribed to particular stock(company).

It uses Yahoo stock API to retrieve the stock data for each company
Amazon Kineses handles real-time data streaming. 
It triggers a lambda function, which does the analysis and sends data to Amazon SNS topics for each stock(company)

The subscribers who subscribed to the stock(company) will receive an email notification with the data related to the stock.
