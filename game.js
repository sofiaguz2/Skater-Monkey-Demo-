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
    intervalId: undefined,
    score: 0,
    musicaFondo: new Audio ("soundtrack/SOUNDTRACKFINALMONKEY.mp3"),
    musicaColision: new Audio ("soundtrack/musicaColision.mp3"),
    gameOver: false,

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
      this.gameOverImage = new Image ()
      this.gameOverImage.src = "images/gameOver.jpeg"
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
  
    drawAll() {
      this.background.draw();
      this.bananas.forEach((banana) => {
        banana.draw(this.framesCounter);
      })
      this.snakes.forEach((snake) => {
        snake.draw(this.framesCounter);
      })
      this.monkey.draw(this.framesCounter);
      this.drawText(`score ${this.score}`, 70, 40, "white")
      this.capibaras.forEach((capibara) => {
        capibara.draw(this.framesCounter);
      })
    },
  
    drawText(text, x, y, color) {
      this.ctx.fillStyle = color
      this.ctx.font = '30px arial'
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

    isCollisionSnakes() {
      this.snakes.forEach((snake) => {
        if (this.monkey.monkeyPos.x < snake.snakePos.x + snake.snakeSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > snake.snakePos.x &&
          this.monkey.monkeyPos.y < snake.snakePos.y + snake.snakeSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > snake.snakePos.y) {
          this.musicaFondo.pause()
          clearInterval(this.intervalId); //rompe el intervalo
          console.log("pierdo")
          console.log(this.intervalId)
          this.gameOver = true
          this.gameOverFunction()
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
      this.capibaras.forEach((capibara) => {
        if (this.monkey.monkeyPos.x < capibara.capibaraPos.x + capibara.capibaraSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > capibara.capibaraPos.x &&
          this.monkey.monkeyPos.y < capibara.capibaraPos.y + capibara.capibaraSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > capibara.capibaraPos.y) {
          this.musicaFondo.pause()
          this.musicaColision.play()
          clearInterval(this.intervalId); //rompe el intervalo
          console.log("pierdo")
          this.gameOverFunction()
          this.gameOver = true
        }
      })
    },

    setEventListeners() {
        window.onkeydown = (event) => {
            if(event.key === "ArrowRight"){
                this.monkey.moveRight();
            } else if(event.key === "ArrowLeft") {
                this.monkey.moveLeft();
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