class Game {
    constructor() {
        this.canvas = document.getElementById('keyboard')
        this.ctx = this.canvas.getContext('2d')
        this.snake = [{
            x: 0,
            y: 0
        }]
        this.snake_area = 20
        this.direction = 'right'
        this.moved = false


        setInterval(() => this.init(), 1000)
    }

    init() {
        this.move()
        this.ctx.fillStyle = '#000'
        this.ctx.fillRect(this.snake[0].x, this.snake[0].y, this.snake_area, this.snake_area)
        this.moved = false
    }

    move() {
        switch (this.direction) {
            case 'right':
                this.snake[0].x += this.snake_area
                break
            case 'left':
                this.snake[0].x -= this.snake_area
                break
            case 'up':
                this.snake[0].y -= this.snake_area
                break
            case 'down':
                this.snake[0].y += this.snake_area
                break
        }
    }
}

const game = new Game()

document.addEventListener('keydown', (e) => {
    if (game.moved === false) {
        switch (e.key) {
            case 'ArrowRight':
                if (game.direction !== 'left' && game.direction !== 'right') {
                    game.direction = 'right'
                    game.moved = true
                }
                // this.snake.pop()
                // this.snake.unshift({
                //     x: this.snake[0].x + this.snake_area,
                //     y: this.snake[0].y
                // })
                break
            case 'ArrowLeft':
                if (game.direction !== 'right' && game.direction !== 'left') {
                    game.direction = 'left'
                    game.moved = true
                }
                break
            case 'ArrowUp':
                if (game.direction !== 'down' && game.direction !== 'up') {
                    game.direction = 'up'
                    game.moved = true
                }
                break
            case 'ArrowDown':
                if (game.direction !== 'up' && game.direction !== 'down') {
                    game.direction = 'down'
                    game.moved = true
                }
                break
        }
    }
})
