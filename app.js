const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/artoman42@gmail.com', async(req, res)=>{
    try{
        res.render('info');
    }
    catch(exception){
        console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
})

app.get('/stock', async (req, res) => {
    const options = {
      method: 'GET',
      url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
      params: {
        q: 'tesla',
        region: 'US'
      },
      headers: {
        'X-RapidAPI-Key': '7b4ae594ebmsh65bf83569702a5cp14fdbejsneab8f8f77a1d',
        'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios(options);
      const data = response.data;
      const quotes = data.quotes.map(quote => ({
        symbol: quote.symbol,
        shortname: quote.shortname,
        sector: quote.sector,
        industry: quote.industry
      }));
      res.render('index', {quotes : quotes});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});


