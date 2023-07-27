const yahooStockAPI = require('yahoo-stock-api').default;

const yahoo = new yahooStockAPI();


const companies = ['AAPL','MSFT','AMZN','GE','JPM','CSCO'];
const companyData = [];

const getStocksData = async () =>{
    try{
        const promises = companies.map((symbol) => {
            return yahoo.getSymbol({ symbol }).then((response) => {
              companyData.push({ symbol, data: response });
            });
        });
        await Promise.all(promises)
        console.log(companyData);
        return companyData;
    }catch(e){
        console.log("error :: ", e);
        return null;
    }  
}

// getStocksData();

module.exports = {
    getStocksData
}