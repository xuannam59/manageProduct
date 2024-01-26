const express = require('express');
const app = express();
const port = 3000;

const route = require('./router/client/index.route')

app.set('views', './views');
app.set('view engine', 'pug');


// route
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})