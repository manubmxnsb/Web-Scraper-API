const { getData } = require("./scraper.js");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/scrape',async (req, res) => {
    let result = await getData();
    res.json(result);
});

app.listen(3000, () => console.log('Scraper is listening...'));