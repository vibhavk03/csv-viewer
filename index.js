require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const db = require('./config/mongoose.js');

const app = express();

/* including static assets */
app.use(express.static('./assets'));

/* setting view engine as ejs */
app.set('view engine', 'ejs');
/* refrencing views folder for ejs*/
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

/* routing all requests here */
app.use('/', require('./routes'));

/* starting server here */
app.listen(port, (err) => {
  if (err) {
    console.log(`Error in starting server! => error: ${err}`);
    return;
  }
  console.log(`Server listening on port: ${port}`);
});
