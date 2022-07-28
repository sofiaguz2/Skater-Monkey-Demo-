class Monkey2 {
    constructor(ctx, x, y, width, height, speed, imageSrc) {
      this.ctx = ctx
      this.monkey2Pos = { x: x, y: y }
      this.monkey2Size = { w: width, h: height }
      this.monkey2Image = imageSrc
      this.image = undefined
      this.musicaSalto = new Audio ("soundtrack/musicaSalto.wav")

      this.posY0 = this.monkey2Pos.y;

        this.speed = speed

      this.velY = 1;
      this.gravity = 0.2;

      this.setListeners()
      
    this.init()
  
    }
    
    init() {
      this.image = new Image()
      this.image.src = `images/${this.monkey2Image}`
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
            this.monkey2Pos.x,
            this.monkey2Pos.y,
            this.monkey2Size.w,
            this.monkey2Size.h
        )
        this.animate(framesCounter)
        this.move()
    }
    
    animate(framesCounter) {
        if(framesCounter % 5 == 0){
          this.image.framesIndex++;
        }
        if(this.image.framesIndex >= this.image.frames){
          this.image.framesIndex = 0;
        }
    }
    
    setListeners() {
      document.addEventListener("keydown", e => {
        switch (e.key) {
          case "w":
            if (this.monkey2Pos.y >= this.posY0) { 
              this.jump()
              console.log("lol")
            }
            break
        }
      });
    }
    
    move() {
      if (this.monkey2Pos.y < this.posY0) {
        this.monkey2Pos.y += this.velY
        this.velY += this.gravity
      } else {
        this.posY = this.posY0
        this.velY = 1
      }
    }

    moveLeft() {
      this.monkey2Pos.x -= this.speed
    }
  
    moveRight() {
      this.monkey2Pos.x += this.speed
    }

    jump() {
      this.monkey2Pos.y -= 40
      this.velY -= 8
      this.musicaSalto.play()
    }
  }