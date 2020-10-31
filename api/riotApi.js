const { Console } = require('console');
const https = require('https');
const { resolve } = require('path');
const config = require('../config.js');
const httpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');

module.exports = {
    consulta: function (url, metodo, apiFileName) {
        const options = {
            hostname: '127.0.0.1',
            port: config['puerto'],
            path: url,
            method: metodo,
            headers: {
                'Authorization': 'Basic ' + config['auth']
            },
            rejectUnauthorized: false,
            encoding: 'utf8',
        };

        let _data;
        const req = https.request(options, (res) => {
            res.on('data', data => {
                _data = data.toString('utf8');
            });
            res.on('end', function() {
                fs.writeFile(`api/respuestas/${apiFileName}.xml`, _data, function (err) {
                    if (err) return console.log(err);
                });
            });
        });

        req.end();
    },
};