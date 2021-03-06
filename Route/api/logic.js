let request = require('request');
let key = require('../../config');
exports.search = (lati, longi) => {
    console.log('날씨' + lati + ',' + longi);
    let object = {};
    return new Promise((resolve, reject) => {
        request('http://apis.skplanetx.com/weather/current/hourly?version=1&lat=' + lati + '&lon=' + longi + '&city=&county=&village=&stnid=&appKey=' + key.sktKey, (err, res, body) => {
            if (err) {
                console.log(err);
            }
            let data = JSON.parse(body);

            if (data.error) {

                reject(data.error);

            } else if (data.weather) {
                getRain(lati, longi).then((rain) => {
                    let num = data.weather.hourly[0].sky.code.substring(6, 7);
                    let code = getSky(num);
                    object.update = data.weather.hourly[0].timeRelease;
                    object.region = data.weather.hourly[0].grid.county;
                    object.tc = parseInt(data.weather.hourly[0].temperature.tc);
                    object.tmax = parseInt(data.weather.hourly[0].temperature.tmax);
                    object.tmin = parseInt(data.weather.hourly[0].temperature.tmin);
                    object.humidity = parseInt(data.weather.hourly[0].humidity);
                    object.rain = parseInt(rain);
                    object.skycode = code;
                    object.skyname = data.weather.hourly[0].sky.name;
                    console.log(object.skycode);

                    resolve(object);
                });

            }
        });

    });
};

exports.map = (lati, longi) => {
    return new Promise((resolve, reject) => {
        request('https://apis.skplanetx.com/tmap/pois/search/around?centerLon=' + longi + '&count=&page=&reqCoordType=WGS84GEO&multiPoint=Y&radius=&categories=TV%EB%A7%9B%EC%A7%91;%EC%B9%98%ED%82%A8;%ED%94%BC%EC%9E%90&resCoordType=WGS84GEO&version=1&appKey=ae1f4f88-341c-3d74-a0bb-324a3d4fd36b&centerLat=' + lati, (err, response, body) => {
            let object = JSON.parse(body);
            let data = object.searchPoiInfo.pois.poi;
            let arr = new Array();
            for (let i = 0; i < data.length; i++) {
                let object = {};
                if (data[i].telNo) {
                    object.id = data[i].id;
                    object.lati = data[i].frontLat;
                    object.longi = data[i].frontLon;
                    object.name = data[i].name;
                    object.tel = data[i].telNo;
                    arr.push(object);
                }
                if (arr.length == 5)
                    break;
            }
            resolve({ food: arr });
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

function getSky(num) {
    if (num == 1)
        return 0;
    else if (num == 2 || 3 || 7)
        return 1;
    else if (num == 4 || 6 || 8 || 10)
        return 2;
    else if (num == 5 || 9)
        return 3;
    else if (num == 11 || 12 || 13 || 14)
        return 4;
}

function getRain(lati, longi) {
    return new Promise((resolve, reject) => {
        request('http://apis.skplanetx.com/weather/forecast/3days?version=1&lat=' + lati + '&lon=' + longi + '&appKey=' + key.sktKey, (err, res, body) => {
            if (err) {
                console.log(err);
            } else if (body) {
                let result = new Array();
                let obj = JSON.parse(body);
                let count = new Array();
                let max = 0;
                if (obj.weather.forecast3days[0].fcst3hour.precipitation) {
                    let data = obj.weather.forecast3days[0].fcst3hour.precipitation;

                    for (let i in data)
                        result.push([i, data[i]]);

                    for (let i = 0; i < result.length; i++) {
                        if (i % 2 == 1) {
                            count.push(i);
                        }
                    }
                    for (let i = 0; i < count.length; i++) {
                        if (max < result[i][1]) {
                            max = result[i][1];
                        }
                    }

                    resolve(max);
                }
            }
        });
    });
}