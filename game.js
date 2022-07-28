const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    gameOverImage: undefined,
    monkey: undefined,
    snakes: [],
    bananas: [],
    capibaras: [],
    delfines: [],
    pepinos: [],
    intervalId: undefined,
    score: 0,
    musicaFondo: new Audio ("soundtrack/SOUNDTRACKFINALMONKEY.mp3"),
    musicaColision: new Audio ("soundtrack/musicaColision.mp3"),
    gameOver: 0,
    randomDolphinNumber: undefined,
    vidasImagen: undefined,
    direction: "normal",

    setDimensions() {
      this.width = window.innerWidth -50
      this.height = window.innerHeight-50
      this.canvas.width = this.width
      this.canvas.height = this.height
    },
  
    init() {
      this.canvas = document.getElementById("myCanvas")
      this.ctx = this.canvas.getContext("2d")
      this.setDimensions()
      this.start()
      this.setEventListeners()
      this.musicaFondo.play()
      this.musicaFondo.loop = true
      this.gameOverImage = new Image ()
      this.gameOverImage.src = "images/gameOver.jpeg"
    },
  
    vidas() {
      if (this.gameOver === 0) {
        this.vidasImagen = new Image()
        this.vidasImagen.src = "images/corazon-4.png.png"
        this.ctx.drawImage(this.vidasImagen, 70, 70, 150, 50)
        
      } else if (this.gameOver === 1) {
        this.vidasImagen = new Image(50, 50)
        this.vidasImagen.src = "images/corazon-3.png.png"
        this.ctx.drawImage(this.vidasImagen, 70, 70, 150, 50)
        
      } else if (this.gameOver === 2) {
        this.vidasImagen = new Image(50, 50)
        this.vidasImagen.src = "images/corazon-2.png.png"
        this.ctx.drawImage(this.vidasImagen, 70, 70, 150, 50)
        
      } else if (this.gameOver === 3) {
        this.vidasImagen = new Image(50, 50)
        this.vidasImagen.src = "images/corazon-1.png.png"
        this.ctx.drawImage(this.vidasImagen, 70, 70, 150, 50)
        
      }
    },

    start() {
      this.createAll();
  
      this.intervalId = setInterval(() => {
        this.framesCounter++;
        this.clear();
        this.drawAll();
        this.generateSnakes();
        this.clearSnakes();
        this.generateBananas();
        this.clearBananas();
        this.generateCapibaras();
        this.clearCapibaras();
        this.isCollisionSnakes();
        this.isCollisionBananas();
        this.isCollisionCapibaras();
        this.generateDelfin();
        this.isCollisionDolphin();
        this.clearDolphins();
        this.generatePepino();
        this.isCollisionPepinos();
        this.vidas();
      }, 1000 / this.FPS)
    },
  
    createAll() {
      this.background = new Background(this.ctx, this.width, this.height);
      this.monkey = new Monkey(this.ctx, this.width / 2, this.height - 230, 150, 150, "monkey.png");
    },
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height)
    },
  
    clearSnakes() {
      this.snakes = this.snakes.filter((snake) => {
        return snake.snakePos.y < this.height
      })
    },
  
    clearBananas() {
      this.bananas = this.bananas.filter((banana) => {
        return banana.bananaPos.y < this.height
      })
    },

    clearCapibaras() {
      this.capibaras = this.capibaras.filter((capibara) => {
        return capibara.capibaraPos.x > 0
      })
    },

    clearDolphins() {
      this.delfines = this.delfines.filter((delfin) => {
        return delfin.delfinPos.x < this.width
      })
    },
  
    drawAll() {
      this.background.draw();
      this.bananas.forEach((banana) => {
        banana.draw(this.framesCounter);
      })
      this.snakes.forEach((snake) => {
        snake.draw(this.framesCounter);
      })
      this.monkey.draw(this.framesCounter);
      this.drawText(`bananas: ${this.score}`, 70, 40, "white")
      this.capibaras.forEach((capibara) => {
        capibara.draw(this.framesCounter);
      })
      this.delfines.forEach((delfin) => {
        delfin.draw(this.framesCounter);
      })
      this.pepinos.forEach((pepino) => {
        pepino.draw(this.framesCounter)
      })
    },
  
    drawText(text, x, y, color) {
      this.ctx.fillStyle = color
      this.ctx.font = '30px ARCADECLASSIC'
      this.ctx.fillText(text, x, y)
    },
  
    generateSnakes() {
      if (this.framesCounter % 300 === 0) {
        this.snakes.push(new Snake(this.ctx, Math.floor(Math.random() * (this.width - 0 + 1) + 0), 30, 75, 75, Math.floor(Math.random() * (5 - 3 + 1) + 3), "tortuga.png"))
      }
    },
  
    generateBananas() {
      if (this.framesCounter % 80 === 0) {
        this.bananas.push(new Banana(this.ctx, Math.floor(Math.random() * (this.width - 0 + 1) + 0), 30, 100, 100, Math.floor(Math.random() * (6 - 4 + 1) + 4), "banana.png"))
        console.log("banana")
      }
    },
  
    generateCapibaras() {
      if (this.framesCounter % 500 === 0) {
        this.capibaras.push(new Capibara(this.ctx, this.width, this.height - 150, 75, 60, Math.floor(Math.random() * (7 - 5 + 1) + 5), "carpincho eno (2).png"))
      }
    },
    generateDelfin() {
      if (this.framesCounter % 2005 === 0) {
        this.delfines.push(new Delfin(this.ctx, 0, this.height - 400, 150, 75, Math.floor(Math.random() * (12 - 10 + 1) + 10), "delfin.png"))
      }
    },
    generatePepino() {
      if (this.framesCounter % 1000 === 0) {
        this.pepinos.push(new Pepino(this.ctx, Math.floor(Math.random() * (this.width - 0 + 1) + 0), this.height - 400, 150, 75, Math.floor(Math.random() * (6 - 4 + 1) + 4), "pepino.png"))
        console.log("pepino")
      }
    },

    isCollisionSnakes() {
      this.snakes.forEach((snake, index) => {
        if (this.monkey.monkeyPos.x < snake.snakePos.x + snake.snakeSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > snake.snakePos.x &&
          this.monkey.monkeyPos.y < snake.snakePos.y + snake.snakeSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > snake.snakePos.y) {
          this.gameOver += 1
          this.snakes.splice(index, 1)
          if (this.gameOver === 3) {
            this.musicaFondo.pause()
            this.musicaColision.play()
            clearInterval(this.intervalId)
            this.gameOverFunction()
          }
        }
      })
    },
    
    isCollisionBananas() {
      this.bananas.forEach((banana, index) => {
        if (this.monkey.monkeyPos.x < banana.bananaPos.x + banana.bananaSize.w &&
            this.monkey.monkeyPos.x + this.monkey.monkeySize.w > banana.bananaPos.x &&
            this.monkey.monkeyPos.y < banana.bananaPos.y + banana.bananaSize.h &&
            this.monkey.monkeySize.h + this.monkey.monkeyPos.y > banana.bananaPos.y) {
          this.score += 1
          this.bananas.splice(index, 1)
        }
      })
    },

    isCollisionCapibaras() {
      this.capibaras.forEach((capibara, index) => {
        if (this.monkey.monkeyPos.x < capibara.capibaraPos.x + capibara.capibaraSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > capibara.capibaraPos.x &&
          this.monkey.monkeyPos.y < capibara.capibaraPos.y + capibara.capibaraSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > capibara.capibaraPos.y) {
          //rompe el intervalo
          this.musicaColision.play()
          this.gameOver += 1
          this.capibaras.splice(index, 1)
          if (this.gameOver === 3) {
            this.musicaFondo.pause()
            clearInterval(this.intervalId)
            this.gameOverFunction()
          }
        }
      })
    },
    
    isCollisionDolphin() {
      this.delfines.forEach((delfin, index) => {
        if (this.monkey.monkeyPos.x < delfin.delfinPos.x + delfin.delfinSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > delfin.delfinPos.x &&
          this.monkey.monkeyPos.y < delfin.delfinPos.y + delfin.delfinSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > delfin.delfinPos.y) {
          // clearInterval(this.intervalId); //rompe el intervalo
          this.gameOver -= 1
          this.delfines.splice(index, 1)
          if (this.gameOver < 0) {
            this.gameOver = 0
          }
        }
      })
    },

    isCollisionPepinos() {
      this.pepinos.forEach((pepino, index) => {
        if (this.monkey.monkeyPos.x < pepino.pepinoPos.x + pepino.pepinoSize.w &&
            this.monkey.monkeyPos.x + this.monkey.monkeySize.w > pepino.pepinoPos.x &&
            this.monkey.monkeyPos.y < pepino.pepinoPos.y + pepino.pepinoSize.h &&
            this.monkey.monkeySize.h + this.monkey.monkeyPos.y > pepino.pepinoPos.y) {
              if (this.direction === "normal") {
                this.direction = "inverse"
              } else {
                this.direction = "normal"
              }
          this.pepinos.splice(index, 1)
        }
      })
    },

    setEventListeners() {
        window.onkeydown = (event) => {
            if(event.key === "ArrowRight"){
              if(this.direction === "normal") {
                this.monkey.moveRight();
              } else {
                this.monkey.moveLeft();
              }
            } else if(event.key === "ArrowLeft") {
              if(this.direction === "normal") {
                this.monkey.moveLeft()
              } else {
                this.monkey.moveRight()
              }
            }}
    },

    gameOverFunction() {
      this.ctx.fillStyle = "#964B00"
      this.ctx.fillRect(this.width / 4, this.height / 4, this.width / 2, this.height / 2)
      this.ctx.fillStyle = "black"
      this.ctx.font = "100px ARCADECLASSIC"
      this.ctx.fillText("GAME OVER", this.width / 10 * 3.5, this.height / 10 * 4)
      this.ctx.font = "32px ARCADECLASSIC"
      this.ctx.fillStyle = "yellow"
      this.ctx.fillText(`bananas: ${this.score}`, this.width / 6 * 2, this.height / 10 * 6)
      
      this.ctx.fillRect(this.width / 15 * 8, this.height / 13 * 7, this.width / 8, this.height / 10),
      this.ctx.fillStyle = "black"
      this.ctx.font = "25px ARCADECLASSIC"
      this.ctx.fillText("Refresh   to", this.width / 19 * 10.435, this.height / 13 * 7.55)
      this.ctx.fillText("try again", this.width / 19 * 10.445, this.height / 13 * 7.95)
    }
  }