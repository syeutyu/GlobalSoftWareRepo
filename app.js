const express = require('express');
const bodyparser = require('body-parser');
const db = require('./database/conn');
const config = require('./config');
const tRouter = require('./Route/api/router');
const uRouter = require('./Route/user/router');
const mRouter = require('./Route/module/router');
const session = require('express-session');
const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(session({
    key: 'globalkey',
    secret: 'secret',
    resave: false
}));
app.use('/', tRouter);
app.use('/', uRouter);
app.use('/', mRouter);

app.listen(8027, () => {
    console.log('Port On 8027 ');
    db.init(app, config);

});