let request = require('request');
let key = require('../config');

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
        request('https://apis.skplanetx.com/tmap/pois/search/around?centerLon=' + longi + '&count=&page=&reqCoordType=WGS84GEO&multiPoint=Y&radius=&categories=TV%EB%A7%9B%EC%A7%91&resCoordType=WGS84GEO&version=1&appKey=ae1f4f88-341c-3d74-a0bb-324a3d4fd36b&centerLat=' + lati, (err, response, body) => {
            resolve(body);
        });
    });

};