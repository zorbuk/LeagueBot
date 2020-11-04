const { Console } = require('console');
const https = require('https');
const { resolve } = require('path');
const config = require('../config.js');
const fs = require('fs');
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
    consulta: async function (url, metodo, apiFileName, requestData) {
        
        let options, data;
        switch(metodo){
            case `POST`:
                options = {
                    hostname: '127.0.0.1',
                    port: config.puerto,
                    path: url,
                    method: metodo,
                    headers: {
                      'Authorization': 'Basic ' + config.auth,
                      'Content-Type': 'application/json',
                      'Content-Length': requestData.length
                    },
                    encoding: 'utf8',
                  };

                  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
                  const reqPost = https.request(options, res => {
                    console.log(`statusCode: ${res.statusCode}`);
                    console.log(`sent data: `, requestData);

                    let __data;
                    res.on('data', d => {
                      __data = d.toString('utf8');
                    });
                    res.on('end', function() {
                        fs.writeFile(`api/respuestas/${apiFileName}.xml`, __data, function (err) {
                            if (err) return console.log(err);
                        });
                    });
                  });
                  
                  reqPost.write(requestData)
                  await config.sleep(0.3);
                  reqPost.end()
                break;
            case `GET`:
                options = {
                    hostname: '127.0.0.1',
                    port: config.puerto,
                    path: url,
                    method: metodo,
                    headers: {
                        'Authorization': 'Basic ' + config.auth,
                    },
                    rejectUnauthorized: false,
                    encoding: 'utf8',
                };

                let _data;
                const reqGet = https.request(options, (res) => {
                    res.on('data', data => {
                        _data = data.toString('utf8');
                    });
                    res.on('end', function() {
                        fs.writeFile(`api/respuestas/${apiFileName}.xml`, _data, function (err) {
                            if (err) return console.log(err);
                        });
                    });
                });
        
                await config.sleep(0.3);
                reqGet.end();
                break;
        }
    },
};