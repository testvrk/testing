//There is all the data that is no other player needs to know about it
class PlayerConfig{
    constructor(settings){
        this.xVector = 0;
        this.yVector = 0;
        this.speed = settings.defaultSpeed
        this.Zoom = settings.defaultZoom
    }
}

module.exports = PlayerConfig