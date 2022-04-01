class Game {
    constructor() {
        this.canvas = document.getElementById('keyboard')
        this.ctx = this.canvas.getContext('2d')
        this.snake = [[60, 60], [60, 60], [60, 60]]
        this.snake_area = 20
        this.direction = 'right'
        this.moved = false
        this.food = []

        this.generate_food()

        this.interval = setInterval(() => this.init(), 1000)
    }

    init() {
        this.move()

        this.lose_conditions()
        this.check_food()

        this.ctx.clearRect(0, 0, 500, 500)
        for (let pos of this.snake) {
            this.ctx.fillStyle = '#77f'
            this.ctx.fillRect(pos[0], pos[1], this.snake_area - 1, this.snake_area - 1)

            this.ctx.fillStyle = '#f44'
            this.ctx.fillRect(this.food[0], this.food[1], this.snake_area - 1, this.snake_area - 1)
        }
        
        this.moved = false
    }

    move() {
        switch (this.direction) {
            case 'right':
                this.update_snake([
                    this.snake[0][0] + this.snake_area,
                    this.snake[0][1]
                ])
                break
            case 'left':
                this.update_snake([
                    this.snake[0][0] - this.snake_area,
                    this.snake[0][1]
                ])
                break
            case 'up':
                this.update_snake([
                    this.snake[0][0],
                    this.snake[0][1] - this.snake_area
                ])
                break
            case 'down':
                this.update_snake([
                    this.snake[0][0],
                    this.snake[0][1] + this.snake_area
                ])
                break
        }
    }

    update_snake(position) {
        this.snake.pop()
        this.snake.unshift(position)
    }

    lose_conditions() {
        try {
            let head = this.snake[0]

            // Check if snake is out of bounds
            if (head[0] < 0 || head[0] >= 500 || head[1] < 0 || head[1] >= 500) {
                throw ''
            }
    
            let snake_body = this.snake.slice(1)
    
            // Check if snake is eating itself
            for (let i in snake_body) {
                if (this.snake[0].every((val, index) => val === snake_body[i][index]) === true) {
                    throw ''
                }
            }
        } catch (e) {
            alert('You lose')
            clearInterval(this.interval)
        }
    }

    generate_food() {
        this.food[0] = Math.floor(Math.random() * (500 / this.snake_area)) * this.snake_area
        this.food[1] = Math.floor(Math.random() * (500 / this.snake_area)) * this.snake_area
    }

    check_food() {
        if (this.snake[0].every((val, index) => val === this.food[index]) === true) {
            this.generate_food()
            this.snake.push(this.snake[this.snake.length - 1])
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
