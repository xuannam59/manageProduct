const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT;

const route = require('./router/client/index.route')

app.set('views', './views');
app.set('view engine', 'pug');


// route
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})