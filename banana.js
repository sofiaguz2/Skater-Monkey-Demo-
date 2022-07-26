class Banana {
    constructor(ctx, x, y, width, height, speed, bananaImage) {
        this.ctx = ctx
        this.bananaPos = {x: x, y: y}
        this.bananaSize = {w: width, h: height}
        this.speed = speed
        this.bananaImage = bananaImage
      this.image = undefined
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.bananaImage}`
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
            this.bananaPos.x,
            this.bananaPos.y,
            this.bananaSize.w,
            this.bananaSize.h
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
        this.bananaPos.y += this.speed
    }
}