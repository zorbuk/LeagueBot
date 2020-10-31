const fs = require('fs');
const config = require('../config.js');
const riotApi = require('../api/riotApi.js');

module.exports = {
    // --------------- Funciones
    obtenerGameFlow: function(){
        riotApi.consulta('/lol-gameflow/v1/gameflow-phase', 'GET', 'gameflow-phase');
        return fs.readFileSync('api/respuestas/gameflow-phase.xml').toString();
    },
    obtenerAllGameData: function(){
        riotApi.consulta('/liveclientdata/allgamedata', 'GET', 'allgamedata');
        return fs.readFileSync('api/respuestas/allgamedata.xml').toString();
    },
    obtenerActivePlayerData: function(){
        riotApi.consulta('/liveclientdata/activeplayer', 'GET', 'activeplayer');
        return fs.readFileSync('api/respuestas/activeplayer.xml').toString();
    },
    obtenerActivePlayerHabilities:function(){
        riotApi.consulta('/liveclientdata/activeplayerabilities', 'GET', 'activeplayerabilities');
        return fs.readFileSync('api/respuestas/activeplayerabilities.xml').toString();
    },
    obtenerActivePlayerRunes:function(){
        riotApi.consulta('/liveclientdata/activeplayerrunes', 'GET', 'activeplayerrunes');
        return fs.readFileSync('api/respuestas/activeplayerrunes.xml').toString();
    },
    obtenerPlayerList:function(){
        riotApi.consulta('/liveclientdata/playerlist', 'GET', 'playerlist');
        return fs.readFileSync('api/respuestas/playerlist.xml').toString();
    },
    obtenerPlayerScore:function(playerName){
        riotApi.consulta(`/liveclientdata/playerscores?summonerName=${playerName}`, 'GET', 'playerscores');
        return fs.readFileSync('api/respuestas/playerscores.xml').toString();
    },
    obtenerPlayerSummonerSpells:function(playerName){
        riotApi.consulta(`/liveclientdata/playersummonerspells?summonerName=${playerName}`, 'GET', 'playersummonerspells');
        return fs.readFileSync('api/respuestas/playersummonerspells.xml').toString();
    },
    obtenerPlayerItems:function(playerName){
        riotApi.consulta(`/liveclientdata/playeritems?summonerName=${playerName}`, 'GET', 'playeritems');
        return fs.readFileSync('api/respuestas/playeritems.xml').toString();
    },
    obtenerGameEvents:function(){
        riotApi.consulta('/liveclientdata/eventdata', 'GET', 'eventdata');
        return fs.readFileSync('api/respuestas/eventdata.xml').toString();
    },
    obtenerGameStats:function(){
        riotApi.consulta('/liveclientdata/gamestats', 'GET', 'gamestats');
        return fs.readFileSync('api/respuestas/gamestats.xml').toString();
    }
};