class Monkey {
    constructor(ctx, x, y, width, height, speed, imageSrc) {
      this.ctx = ctx
      this.monkeyPos = { x: x, y: y }
      this.monkeySize = { w: width, h: height }
      this.monkeyImage = imageSrc
      this.image = undefined
      this.musicaSalto = new Audio ("soundtrack/musicaSalto.wav")

      this.speed = speed

      this.posY0 = this.monkeyPos.y;

      this.velY = 1;
      this.gravity = 0.2;

      this.setListeners()
      
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
          case "ArrowUp":
            if (this.monkeyPos.y >= this.posY0) { 
              this.jump()
              console.log("lol")
            }
            break
        }
      });
    }
    
    move() {
      if (this.monkeyPos.y < this.posY0) {
        this.monkeyPos.y += this.velY
        this.velY += this.gravity
      } else {
        this.posY = this.posY0
        this.velY = 1
      }
    }

    moveLeft() {
      this.monkeyPos.x -= this.speed
    }
  
    moveRight() {
      this.monkeyPos.x += this.speed
    }

    jump() {
      this.monkeyPos.y -= 40
      this.velY -= 8
      this.musicaSalto.play()
    }
  }