const robot = require("robotjs");
const pixel = require("./detection/pixel.js");
const config = require("./config.js");
const clientManager = require("./managers/clientManager.js");
const gameManager = require("./managers/gameManager.js");
const http = require("http");
const { tipoCola } = require("./config.js");
const fs = require('fs').promises;

/* ********************
    Este proyecto ha sido realizado por Zorbuk.
    https://github.com/zorbuk

    Se ha usado lo siguiente:
    - Visual Studio Code, el editor.
    - Node.js, el framework.
    - Npm, el package manager.
    - Robot.js, framework para pixeles, control del ratón y del teclado.
    - Fs, modulo para archivos del sistema.
*/

// ********************

main();
let __botClientStatus;

// ********************

async function main(){
    console.clear();
    console.log("LeagueBot JS hecho por Zorbuk en Nodejs con Robotjs");

    while(config.auth===null){
        clientManager.inicializar();
        await config.sleep(2);
    }

    console.log(`[ ¡Éxito! ] Auth '${config.auth}' ~ Puerto '${config.puerto}'.`);

    procesoIniciarPartida();
}

async function procesoIniciarPartida(){
    while(true){
        
        // ********************
        // Evitar el spam en consola.
        // ********************

        if(gameManager.obtenerGameFlow() != __botClientStatus){
            __botClientStatus = gameManager.obtenerGameFlow();
            console.log(`[ Estado ] ${gameManager.obtenerGameFlow()}`); // ? answerManager.Beautify(gameManager.obtenerGameFlow());
        }

        // ********************
        switch(gameManager.obtenerGameFlow()){
            case `"None"`:
                clientManager.crearPartida(tipoCola.botsIntroduccion);
                break;
            case `"Lobby"`:
                //gameManager.buscarPartida();
                break;
            case `"Matchmaking"`:
                //gameManager.partidaEncontrada();
                break;
            default:
                await config.sleep(0.5);
                break;
        }
        await config.sleep(1);
    }
}