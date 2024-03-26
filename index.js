const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require('./router/admin/index.route');
const route = require('./router/client/index.route');

app.use(methodOverride('_method'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// flash
app.use(cookieParser('ADSAFAFSSGFS'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

// App Local variable
app.locals.prefitAdmin = systemConfig.prefixAdmin;
app.use(express.static(`${__dirname}/public`));


// Route
route(app);
routeAdmin(app);

//config
database.connect();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})