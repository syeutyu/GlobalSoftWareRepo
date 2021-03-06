var mongoose = require('mongoose');
var database = {};
database.init = function(app, config) {
    connect(app, config);
}

function connect(app, config) {

    mongoose.Promise = global.Promise;
    mongoose.connect(config.db_url, { useMongoClient: true });
    database.connection = mongoose.connection;
    database.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.connection.on('open', function() {
        console.log('데이터베이스에 연결되었습니다. : ' + config.db_url);

    });
    database.connection.on('disconnected', connect);
}

module.exports = database;