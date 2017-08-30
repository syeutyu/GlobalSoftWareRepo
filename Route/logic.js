const request = require('request');
const key = require('../config');

exports.search = (lati, longi) => {
    console.log(key);
    return new Promise((resolve, reject) => {
        request('http://apis.skplanetx.com/weather/current/minutely?version=1&lat=' + lati + '&lon=' + longi + '&city=&county=&village=&stnid=&appKey=' + key.sktKey, (err, res, body) => {
            resolve(body);
        });
    });
};
exports.map = (lati, longi) => {
    return new Promise((resolve, reject) => {
        request('')
    });
};