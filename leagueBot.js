const robot = require("robotjs");
const pixel = require("./detection/pixel.js");
const config = require("./config.js");
const clientManager = require("./managers/clientManager.js");
const gameManager = require("./managers/gameManager.js");

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

console.clear();

/* Inicializar bot */
console.log("LeagueBot JS hecho por Zorbuk en Nodejs con Robotjs");
main();

async function main(){
    while(config['auth']===null){
        clientManager.inicializar();
        await sleep(2);
    }

    console.log(`[ ¡Éxito! ] Auth '${config['auth']}' ~ Puerto '${config['puerto']}'.`);

    await sleep(5);
    // TODO
}

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds*1000));
  }