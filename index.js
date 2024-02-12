const express = require('express');
const methodOverride = require('method-override');
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const database = require("./config/database")

const systemConfig = require("./config/system")

const routeAdmin = require('./router/admin/index.route')
const route = require('./router/client/index.route')

app.use(methodOverride('_method'))
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

// App Local variable
app.locals.prefitAdmin = systemConfig.prefixAdmin;

// route
route(app);

// route Admin
routeAdmin(app);

//config
database.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})