const robot = require("robotjs");
const pixel = require("./detection/pixel.js");
const config = require("./config.js");
const clientManager = require("./managers/clientManager.js");
const gameManager = require("./managers/gameManager.js");
const consoleManager = require("./managers/consoleManager.js");
const http = require("http");
const { tipoCola, campeon } = require("./config.js");
const { obtenerColor } = require("./detection/pixel.js");
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
let __botBuscandoPartida = false;

// ********************

async function main(){
    console.clear();
    consoleManager.escribir("LeagueBot JS hecho por Zorbuk en Nodejs con Robotjs");

    while(config.auth===null){
        clientManager.inicializar();
        await config.sleep(2);
    }

    consoleManager.escribir(`Auth '${config.auth}' ~ Puerto '${config.puerto}, 2999'.`);

    procesoIniciarPartida();
}

async function procesoIniciarPartida(){
    while(true){
        
        // ********************
        // Evitar el spam en consola.
        // ********************

        if(gameManager.obtenerGameFlow(config.puerto) != __botClientStatus){
            __botClientStatus = gameManager.obtenerGameFlow(config.puerto);
            consoleManager.escribir(`Estado del bot: ${JSON.parse(__botClientStatus)}`);
        }

        // ********************
        switch(gameManager.obtenerGameFlow(config.puerto)){
                // Inactivo.
            case `"None"`:
                clientManager.crearPartida(config.puerto, tipoCola.botsIntroduccion);
                break;
                // Partida creada.
            case `"Lobby"`:
                if(!__botBuscandoPartida){
                    clientManager.buscarPartida(config.puerto);
                    __botBuscandoPartida = true;
                }
                break;
                // Una partida ha sido encontrada.
            case `"ReadyCheck"`:
                clientManager.aceptarPartida(config.puerto);
                break;
                // En seleccion de campeón.
            case `"ChampSelect"`:
                clientManager.pickearCampeon(config.puerto, campeon.Yasuo);
                break;
                // La partida está en progreso.
            case `"InProgress"`:
                if(pixel.existeColorPuntoExacto(pixel.color.partida_en_curso, 791, 1030)){
                    let campeonEnemigo = pixel.obtenerColor(pixel.color.campeon_enemigo,config.rangoBusquedaPixel.x,config.rangoBusquedaPixel.y,config.rangoBusquedaPixel.width,config.rangoBusquedaPixel.height);
                    let subditoEnemigo = pixel.obtenerColor(pixel.color.subdito_enemigo,config.rangoBusquedaPixel.x,config.rangoBusquedaPixel.y,config.rangoBusquedaPixel.width,config.rangoBusquedaPixel.height);

                    if(subditoEnemigo != null){
                        // Atacar a los subditos
                        robot.moveMouse(subditoEnemigo.X, subditoEnemigo.Y);
                        robot.keyToggle("A");
                    }else{
                        // Usar el minimapa para moverse, ver torretas, etc...
                        let subditoAliadoMinimapa = pixel.obtenerColor(pixel.color.minimapa_subditos_aliados,config.rangoBusquedaMinimapa.x,config.rangoBusquedaMinimapa.y,config.rangoBusquedaMinimapa.width,config.rangoBusquedaMinimapa.height);

                        if(subditoAliadoMinimapa != null){
                            robot.moveMouse(subditoAliadoMinimapa.X, subditoAliadoMinimapa.Y);
                            robot.keyToggle("A");
                        }
                    }
                }
                break;
                // Dar honor
            case `"PreEndOfGame"`:

                break;
                // Salir de la partida
            case `"EndOfGame"`:

                __botBuscandoPartida = false;
                break;
            default:
                await config.sleep(0.1);
                break;
        }
        await config.sleep(1);
    }
}