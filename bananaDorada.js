class BananaDorada {
    constructor(ctx, x, y, width, height, speed, bananaDoradaImage) {
        this.ctx = ctx
        this.bananaDoradaPos = {x: x, y: y}
        this.bananaDoradaSize = {w: width, h: height}
        this.speed = speed
        this.bananaDoradaImage = bananaDoradaImage
      this.image = undefined
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.bananaDoradaImage}`
      this.image.frames = 2;
      this.image.framesIndex = 0;
    }
    draw(framesCounter) {
        this.move()
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.bananaDoradaPos.x,
            this.bananaDoradaPos.y,
            this.bananaDoradaSize.w,
            this.bananaDoradaSize.h
          )
          this.animate(framesCounter)
    }
    animate(framesCounter) {
        if(framesCounter % 5 == 0){
          this.image.framesIndex++;
        }
        if(this.image.framesIndex >= this.image.frames){
          this.image.framesIndex = 0;
        }
      }
    move() {
        this.bananaDoradaPos.y += this.speed
    }
}