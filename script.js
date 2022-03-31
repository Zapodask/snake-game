class Game {
    constructor() {
        this.canvas = document.getElementById('keyboard')
        this.ctx = this.canvas.getContext('2d')
        this.snake = [{
            x: 60,
            y: 60
        }, {
            x: 60,
            y: 60
        }, {
            x: 60,
            y: 60
        }]
        this.snake_area = 20
        this.direction = 'right'
        this.moved = false


        setInterval(() => this.init(), 1000)
    }

    init() {
        this.move()
        this.ctx.clearRect(0, 0,500, 500)
        for (let pos of this.snake) {
            this.ctx.fillStyle = '#77f'
            this.ctx.fillRect(pos.x, pos.y, this.snake_area - 1, this.snake_area - 1)
        }
        this.moved = false
    }

    move() {
        switch (this.direction) {
            case 'right':
                this.update_snake({
                    x: this.snake[0].x + this.snake_area,
                    y: this.snake[0].y
                })
                break
            case 'left':
                this.update_snake({
                    x: this.snake[0].x - this.snake_area,
                    y: this.snake[0].y
                })
                break
            case 'up':
                this.update_snake({
                    x: this.snake[0].x,
                    y: this.snake[0].y - this.snake_area
                })
                break
            case 'down':
                this.update_snake({
                    x: this.snake[0].x,
                    y: this.snake[0].y + this.snake_area
                })
                break
        }
    }

    update_snake(position) {
        this.snake.pop()
        this.snake.unshift(position)
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
