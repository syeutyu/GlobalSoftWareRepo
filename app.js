let express = require('express');
let tRouter = require('./Route/router');
let app = express();

app.use('/', tRouter);

app.listen(80, () => {
    console.log('Port On ');
});