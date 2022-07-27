class Snake {
    constructor(ctx, x, y, width, height, speed, snakeImage) {
        this.ctx = ctx
        this.snakePos = {x: x, y: y}
        this.snakeSize = {w: width, h: height}
        this.speed = speed
        this.snakeImage = snakeImage
      this.image = undefined
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.snakeImage}`
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
            this.snakePos.x,
            this.snakePos.y,
            this.snakeSize.w,
            this.snakeSize.h
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
        this.snakePos.y += this.speed
    }
}