class Delfin {
    constructor(ctx, x, y, width, height, speed, delfinImage) {
        
        this.ctx = ctx
        this.delfinPos = {x: x, y: y}
        this.delfinSize = {w: width, h: height}
        this.speed = speed
        this.delfinImage = delfinImage
        this.image = undefined

        this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.delfinImage}`
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
            this.delfinPos.x,
            this.delfinPos.y,
            this.delfinSize.w,
            this.delfinSize.h
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
        this.delfinPos.x += this.speed
    }
}