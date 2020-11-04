module.exports = {
    msPorDefecto: 100,
    rangoBusquedaPixel: {
        x:500, 
        y:150, 
        width: this.x-1200, 
        height: this.y-580
    },
    leagueOfLegendsLockfile: `C:\\Riot Games\\League of Legends\\lockfile`,
    auth: null,
    puerto: 0,
    localServerHost: `localhost`,
    localServerPuerto: 8000,
    tipoCola: {
        botsIntroduccion: 830,
        botsIntermedio: 850
    },
    sleep:(seconds) => {
        return new Promise(resolve => setTimeout(resolve, seconds*1000));
      }
};