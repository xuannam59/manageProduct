const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const database = require("./config/database")

const route = require('./router/client/index.route')


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

// route
route(app);
//
database.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})