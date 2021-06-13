const express = require('express');
const app = express();
const newsRouter = require('./routers/news');
const thriftRouter = require('./routers/thrift');
const db = require("./models");

app.use(express.static('public'));
app.use(express.static('data/uploads'));
app.use('/api/news', newsRouter);
app.use('/api/thrift', thriftRouter);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  console.log("Database working.");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});


// ~/Documents/my_digital_school/bachelor_dev/cocktail_de_fripes/app/back-cdf