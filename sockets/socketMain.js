//where all our main socket stuff will go
const io = require('../server').io
const Player = require('./classes/Player')
const PlayerData = require('./classes/PlayerData')
const PlayerConfig = require('./classes/PlayerConfig')

const Orb = require('./classes/Orb')
let orbs = []
let players = []
settings = {
    defaultOrbs: 500,
    defaultSpeed: 6,
    defaultSize: 6,
    // as player gets bigger , the zoom needs to go out
    defaultZoom: 1.5,
    WorldWidth: 500,
    WorldHeight: 500,


}


initGame()

//issue a msg to every connected socket 30 fps

io.sockets.on('connect', (socket) => {
    let player = {}
    let playerConfig = {}
    let playerData = {}
    //A playes has connected
    socket.on('init', (data) => {
        //add the player to the game namespace
        socket.join('game');
        // make a playerConfig Object
        playerConfig = new PlayerConfig(settings);
        // Make a playerData object
        playerData = new PlayerData(settings, data.playerName);
        // make a master player object to hold both
        player = new Player(socket.id, playerConfig, playerData)

        setInterval(() => {
            io.to('game').emit('tock', {
                players,
                playerX : player.playerData.locX,
                playerY : player.playerData.locY
            }) 
        }, 33)//there are 30 33s in 1000ms,or 1/30th of a sec, or 1 of 30fps
        socket.emit('initReturn', {
            orbs
        })
        players.push(playerData)
    })
    //the server sent over a tick .that means we know what direction to move the socket
    socket.on('tick', (data) => {

        speed = 10 //player.playerConfig.speed
        xV = player.playerConfig.xVector = data.xVector;
        yV = player.playerConfig.yVector = data.yVector;

        if ((player.playerData.locX < 5 && player.playerData.xVector < 0) || (player.playerData.locX > 500) && (xV > 0)) {
            player.playerData.locY -= speed * yV;
        } else if ((player.playerData.locY < 5 && yV > 0) || (player.playerData.locY > 500) && (yV < 0)) {
            player.playerData.locX += speed * xV;
        } else {
            player.playerData.locX += speed * xV;
            player.playerData.locY -= speed * yV;
        }
    })

})
//Run at the begining of every game
function initGame() {
    for (let i = 0; i < settings.defaultOrbs; i++) {
        orbs.push(new Orb(settings))
    }
}

module.exports = io