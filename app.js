const express = require('express');
const tRouter = require('./Route/router');
const bodyparser = require('body-parser');
const db = require('./database/conn');
const config = require('./config');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/', tRouter);

app.listen(8027, () => {
    console.log('Port On 8027 ');
    db.init(app, config);

});