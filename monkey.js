class Monkey {
    constructor(ctx, x, y, width, height, imageSrc) {
      this.ctx = ctx
      this.monkeyPos = { x: x, y: y }
      this.monkeySize = { w: width, h: height }
      this.monkeyImage = imageSrc
      this.image = undefined
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.monkeyImage}`
      this.image.frames = 2;
      this.image.framesIndex = 0;
    }
  
    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * (this.image.width / this.image.frames),
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.monkeyPos.x,
            this.monkeyPos.y,
            this.monkeySize.w,
            this.monkeySize.h
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
    moveLeft() {
      this.monkeyPos.x -= 20
    }
  
    moveRight() {
      this.monkeyPos.x += 20
    }
  }