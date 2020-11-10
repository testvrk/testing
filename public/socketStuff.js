let socket = io.connect('http://localhost:8080')

//this function is called when user clicks on starts
function init(){
    draw()
// console.log(orbs)
socket.emit('init',{
playerName : player.name
})
}


socket.on('initReturn',(data)=>{
    // console.log(data.orbs)
    orbs = data.orbs
    setInterval(()=>{
      socket.emit('tick',{
          xVector : player.xVector,
          yVector : player.yVector

      })   
    },33)
})
socket.on('tock',(data)=>{
    console.log(data)
    players = data.players
    player.locX = data.playerX,
    player.locY = data.playerY
})