class Pepino {
    constructor(ctx, x, y, width, height, speed, pepinoImage) {
        this.ctx = ctx
        this.pepinoPos = {x: x, y: y}
        this.pepinoSize = {w: width, h: height}
        this.speed = speed
        this.pepinoImage = pepinoImage
      this.image = undefined
      
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.pepinoImage}`
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
            this.pepinoPos.x,
            this.pepinoPos.y,
            this.pepinoSize.w,
            this.pepinoSize.h
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
        this.pepinoPos.y += this.speed
    }
    
}