const fs = require('fs');
const config = require('../config.js');
const riotApi = require('../api/riotApi.js');

module.exports = {
    // -------------- //
    //  ClientStartup //
    // -------------- //
    inicializar: function(){
        const buffer = fs.readFileSync(config.leagueOfLegendsLockfile);
        const args = buffer.toString().split(":");
        config.auth = Buffer.from('riot:'+args[3]).toString('base64');
        config.puerto = args[2];
    },
    // --------------- Informaciones Basicas
    obtenerActivePlayerName: function(){
        riotApi.consulta('/liveclientdata/activeplayername', 'GET', 'activeplayername');
        config.sleep(0.5);
        return fs.readFileSync('api/respuestas/activeplayername.xml').toString();
    },
    // --------------- Funciones
    crearPartida: function(tipo){
        let data = JSON.stringify({
            queueId: tipo
          })
        riotApi.consulta(`/lol-lobby/v2/lobby`, 'POST', 'lobby', data);
        config.sleep(0.5);
        return fs.readFileSync('api/respuestas/lobby.xml').toString();
    },
};