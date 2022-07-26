const Game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    background: undefined,
    monkey: undefined,
    snakes: [],
    bananas: [],
    intervalId: undefined,
    score: 0,
  
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
        this.isCollisionSnakes();
        this.isCollisionBananas();
  
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
    },
  
    drawText(text, x, y, color) {
      this.ctx.fillStyle = color
      this.ctx.font = '30px arial'
      this.ctx.fillText(text, x, y)
    },
  
    generateSnakes() {
      if (this.framesCounter % 150 === 0) {
        this.snakes.push(new Snake(this.ctx, Math.floor(Math.random() * (this.width - 0 + 1) + 0), 30, 100, 100, Math.floor(Math.random() * (6 - 4 + 1) + 4), "tortuga.png"))
      }
    },
  
    generateBananas() {
      if (this.framesCounter % 80 === 0) {
        this.bananas.push(new Banana(this.ctx, Math.floor(Math.random() * (this.width - 0 + 1) + 0), 30, 100, 100, Math.floor(Math.random() * (6 - 4 + 1) + 4), "banana.png"))
        console.log("banana")
      }
    },
  
    isCollisionSnakes() {
      this.snakes.forEach((snake) => {
        if (this.monkey.monkeyPos.x < snake.snakePos.x + snake.snakeSize.w &&
          this.monkey.monkeyPos.x + this.monkey.monkeySize.w > snake.snakePos.x &&
          this.monkey.monkeyPos.y < snake.snakePos.y + snake.snakeSize.h &&
          this.monkey.monkeySize.h + this.monkey.monkeyPos.y > snake.snakePos.y) {
          clearInterval(this.intervalId); //rompe el intervalo
          console.log("pierdo")
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
    setEventListeners() {
        window.onkeydown = (event) => {
            if(event.key === "ArrowRight"){
                this.monkey.moveRight();
            } else if(event.key === "ArrowLeft") {
                this.monkey.moveLeft();
            }}
    },
  }