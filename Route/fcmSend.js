const FCM = require('fcm-node');
const config = require('../config');

exports.sendFcm = (clienKey, type) => {
    let fcm = new FCM(config.serverKey);

    if (type == 'water') {
        return new Promise((resolve, reject) => {
            let message = {
                to: clienKey,
                notification: {
                    title: '비도오고 그래서',
                    body: '창문 닫았어요'
                },
                data: {
                    my_key: 'water'
                }
            };

            fcm.send(message, (err, res) => {
                if (err) {
                    reject(err);
                } else if (res) {
                    resolve(res);
                }
            });
        });

    } else if (type == 'door') {
        return new Promise((resolve, reject) => {
            let message = {
                to: clienKey,
                notification: {
                    title: '비도오고 그래서',
                    body: '오늘의 날씨에요'
                },
                data: {
                    my_key: 'door'
                }
            };

            fcm.send(message, (err, res) => {
                if (err) {
                    reject(err);
                } else if (res) {
                    resolve(res);
                }
            });
        });
    }
};