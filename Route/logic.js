let request = require('request');
let key = require('../config');

exports.search = (lati, longi) => {
    let object = {};
    return new Promise((resolve, reject) => {
        request('http://apis.skplanetx.com/weather/current/hourly?version=1&lat=' + lati + '&lon=' + longi + '&city=&county=&village=&stnid=&appKey=' + key.sktKey, (err, res, body) => {
            if (err) {
                reject(err);
            }
            let data = JSON.parse(body);

            if (data.error) {

                reject(data.error);

            } else if (data.weather) {

                object.update = data.weather.hourly[0].timeRelease;
                object.region = data.weather.hourly[0].grid.county;
                object.tc = parseInt(data.weather.hourly[0].temperature.tc);
                object.tmax = parseInt(data.weather.hourly[0].temperature.tmax);
                object.tmin = parseInt(data.weather.hourly[0].temperature.tmin);
                object.humidity = parseInt(data.weather.hourly[0].humidity);
                object.sky = data.weather.hourly[0].sky;

                resolve(object);
            }
        });

    });
};

exports.map = (lati, longi) => {
    return new Promise((resolve, reject) => {
        request('https://apis.skplanetx.com/tmap/pois/search/around?centerLon=' + longi + '&count=&page=&reqCoordType=WGS84GEO&multiPoint=Y&radius=&categories=TV%EB%A7%9B%EC%A7%91&resCoordType=WGS84GEO&version=1&appKey=ae1f4f88-341c-3d74-a0bb-324a3d4fd36b&centerLat=' + lati, (err, response, body) => {
            let object = JSON.parse(body);
            resolve(object.searchPoiInfo.pois.poi);
        });
    });

};

exports.getCategory = (arr, callback) => {
    let array = new Array();
    for (let i = 0; i < arr.length; i++) {
        (function(i) {
            request('https://apis.skplanetx.com/tmap/pois/' + arr[i].id + '?callback=&resCoordType=&version=1 &appKey=' + key.sktKey, (err, response, body) => {
                if (err) {
                    throw err;
                } else if (body) {
                    let object = JSON.parse(body);
                    addCategory(object, arr, i).then((data) => {
                        array.push(data);
                        return array;
                    }).then((array) => {
                        if (array.length == arr.length) {
                            callback(array);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });

                }
            });
        })(i);
    }
};

let addCategory = (obj, arr, i) => {
    return new Promise((resolve, reject) => {
        arr[i].category = obj.poiDetailInfo.bizCatName;
        resolve(arr[i]);
    });

};