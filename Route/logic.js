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
            let object = JSON.parse(body);
            resolve(object.searchPoiInfo.pois.poi);
        });
    });

};

exports.getCategory = (arr, callback) => {
    let array = new Array();
    for (let i = 0; i < arr.length; i++) {
        request('https://apis.skplanetx.com/tmap/pois/' + arr[i].id + '?callback=&resCoordType=&version=1 &appKey=' + key.sktKey, (err, response, body) => {
            if (err) {
                throw err;
            } else if (body) {
                let object = JSON.parse(body);
                addCategory(object, arr, i).then((data) => {
                    array.push(data);
                    console.log(array);
                    return array;
                }).then((array) => {
                    if (i == arr.length - 1) {
                        console.log(array);
                        callback(array);
                    }
                }).catch((err) => {
                    console.log(err);
                });

            }
        });
    }
};

let addCategory = (obj, arr, i) => {
    return new Promise((resolve, reject) => {
        arr[i].category = obj.poiDetailInfo.bizCatName;
        resolve(arr[i]);
    });

};