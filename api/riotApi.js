const { Console } = require('console');
const https = require('https');
const { resolve } = require('path');
const config = require('../config.js');
const fs = require('fs');
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const consoleManager = require("../managers/consoleManager.js");

module.exports = {
    consulta: async (url, metodo, apiFileName, requestData, puerto)=> {

        if(requestData == null || requestData === undefined){
            requestData = '';
        }

        let options = {
            hostname: '127.0.0.1',
            port: puerto,
            path: url,
            method: metodo,
            headers: {
              'Authorization': 'Basic ' + config.auth,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Content-Length': requestData.length
            },
            encoding: 'utf8',
          }

        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
                const req = https.request(options, res => {
                    let __data = '';
                    res.on('data', d => {
                      __data = d.toString('utf8');
                    });
                    res.on('end', ()=> {
                        fs.writeFile(`api/respuestas/${apiFileName}.json`, __data, (err) =>{
                            if (err) return console.log(err);
                        });
                    });
                  });
                  
                  if(metodo === 'POST' || metodo === 'PATCH')
                  req.write(requestData);

                  await config.sleep(0.1);
                  req.end();

        /*switch(metodo){
            case `POST`:
                let optionsPost = {
                    hostname: '127.0.0.1',
                    port: config.puerto,
                    path: url,
                    method: 'POST',
                    headers: {
                      'Authorization': 'Basic ' + config.auth,
                      'Content-Type': 'application/json',
                      'Content-Length': requestData.length
                    },
                    encoding: 'utf8',
                  };

                  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
                  const reqPost = https.request(optionsPost, res => {

                    let __data = '';
                    res.on('data', d => {
                      __data = d.toString('utf8');
                    });
                    res.on('end', ()=> {
                        fs.writeFile(`api/respuestas/${apiFileName}.xml`, __data, (err) =>{
                            if (err) return console.log(err);
                        });
                    });
                  });
                  
                  reqPost.write(requestData)

                  await config.sleep(0.1);
                  reqPost.end()
                break;

            case `GET`:
                let optionsGet = {
                    hostname: '127.0.0.1',
                    port: config.puerto,
                    path: url,
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + config.auth,
                    },
                    rejectUnauthorized: false,
                    encoding: 'utf8',
                };

                console.log(`https://${optionsGet.hostname}:${optionsGet.port}${optionsGet.url}`)

                let _data;
                const reqGet = https.request(optionsGet, (res) => {
                    res.on('data', data => {
                        _data = data.toString('utf8');
                    });
                    res.on('end', ()=> {
                        fs.writeFile(`api/respuestas/${apiFileName}.xml`, _data, (err) =>{
                            if (err) return console.log(err);
                        });
                    });
                });
        
                await config.sleep(0.1);
                reqGet.end();
                break;
        }*/
    },
};