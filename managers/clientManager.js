const fs = require('fs');
const config = require('../config.js');
const riotApi = require('../api/riotApi.js');

module.exports = {
    // -------------- //
    //  ClientStartup //
    // -------------- //
    inicializar: ()=>{
        const buffer = fs.readFileSync(config.leagueOfLegendsLockfile);
        const args = buffer.toString().split(":");
        config.auth = Buffer.from('riot:'+args[3]).toString('base64');
        config.puerto = args[2];
    },
    // --------------- Informaciones Basicas
    obtenerActivePlayerName: ()=>{
        riotApi.consulta('/liveclientdata/activeplayername', 'GET', 'activeplayername');
        return fs.readFileSync('api/respuestas/activeplayername.json').toString();
    },
    // --------------- Funciones
    crearPartida: (puerto, tipo)=>{
        let data = JSON.stringify({ queueId: tipo });
        riotApi.consulta(`/lol-lobby/v2/lobby`, 'POST', 'lobby', data, puerto);
        return fs.readFileSync('api/respuestas/lobby.json').toString();
    },
    buscarPartida: (puerto)=>{
        let data = ``;
        riotApi.consulta(`/lol-lobby/v2/lobby/matchmaking/search`, 'POST', 'search', data, puerto);
        return fs.readFileSync('api/respuestas/search.json').toString();
    },
    aceptarPartida: (puerto)=>{
        let data = ``;
        riotApi.consulta(`/lol-matchmaking/v1/ready-check/accept`, 'POST', 'accept', data, puerto);
        return fs.readFileSync('api/respuestas/accept.json').toString();
    },
    obtenerCampeonesPickeables: (puerto)=>{
        riotApi.consulta('/lol-champ-select/v1/pickable-champion-ids', 'GET', 'pickable-champion-ids');
        return fs.readFileSync('api/respuestas/pickable-champion-ids.json').toString();
    },
    pickearCampeon: (puerto, campeon)=>{ // <- Necesita alguna que otra mejora.
            for (let randomId = 0; randomId < 10; randomId++) {
                let data = JSON.stringify({ actorCellId: 0, championId: campeon, completed: true, id:randomId, isAllyAction:true, type:'string' });
                riotApi.consulta(`/lol-champ-select/v1/session/actions/${randomId}`, 'PATCH', 'lol-champ-select', data, puerto);
            }
            return fs.readFileSync('api/respuestas/lol-champ-select.json').toString();
    },
};