class Capibara {
    constructor(ctx, x, y, width, height, speed, capibaraImage) {
        
        this.ctx = ctx
        this.capibaraPos = {x: x, y: y}
        this.capibaraSize = {w: width, h: height}
        this.speed = speed
        this.capibaraImage = capibaraImage
        this.image = undefined

        this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.capibaraImage}`
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
            this.capibaraPos.x,
            this.capibaraPos.y,
            this.capibaraSize.w,
            this.capibaraSize.h
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
        this.capibaraPos.x -= this.speed
    }
}