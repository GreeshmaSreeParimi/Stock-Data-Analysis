This is Stock data Analysis project.
It takes the today's live data and compare it with previous years data and sends notification to subscribers who subscribed to partciular company.

It uses yahoo stock APi to retrieve the data for each company
Amazon kineses handles the real time data streaming. 
It triggers a lambda function , which does the analysis and send data to SNS topics for each stock(company)

The subscribers who subscribed to the stock(company) will recieve an email notification with the data related to stock.