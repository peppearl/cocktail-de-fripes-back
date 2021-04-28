const express = require('express');
const app = express();
const newsRouter = require('./routers/news');
const thriftRouter = require('./routers/thrift');

app.use(express.static('public'));
app.use(express.static('data/uploads'));
app.use('/api', newsRouter);
app.use('/api', thriftRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}.`);
});


// ~/Documents/my_digital_school/bachelor_dev/cocktail_de_fripes/app/back-cdf