let express = require('express');
let tRouter = require('./Route/router');
let app = express();

app.use('/', tRouter);

app.listen(8027, () => {
    console.log('Port On 8027 ');
});