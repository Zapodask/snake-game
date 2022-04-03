const setHighScore = () => document.getElementById('high_score').innerHTML = localStorage.getItem('high_score') || 0

class Game {
    constructor() {
        this.canvas = document.getElementById('keyboard')
        this.ctx = this.canvas.getContext('2d')
        this.snake = [[60, 60], [60, 60], [60, 60]]
        this.snake_area = 20
        this.direction = 'right'
        this.moved = false
        this.food = []
        this.score = 0

        this.generate_food()

        this.interval = setInterval(() => this.init(), 500)
    }

    init() {
        this.move()

        this.lose_conditions()
        this.check_food()

        // Generate snake body
        this.ctx.clearRect(0, 0, 500, 500)
        for (let pos of this.snake) {
            this.create_rect('#77f', '#000', pos[0], pos[1])
        }

        // Generate food
        this.create_rect('#f44', '#050', this.food[0], this.food[1])
        
        this.moved = false
    }

    create_rect(color, border_color, x, y) {
        // Create square with border
        this.ctx.fillStyle = border_color
        this.ctx.fillRect(x, y, this.snake_area, this.snake_area)

        this.ctx.fillStyle = color
        this.ctx.fillRect(x + 1, y + 1, this.snake_area - 2, this.snake_area - 2)
    }

    move() {
        // Move snake
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
        // Update snake position
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
            startBtn.disabled = false

            if (this.score > localStorage.getItem('high_score')) {
                localStorage.setItem('high_score', this.score)
            }

            setHighScore()
        }
    }

    generate_food() {
        // Generate random food
        this.food[0] = Math.floor(Math.random() * (500 / this.snake_area)) * this.snake_area
        this.food[1] = Math.floor(Math.random() * (500 / this.snake_area)) * this.snake_area

        // Check if food is on snake
        for (let i in this.snake) {
            if (this.snake[i].every((val, index) => val === this.food[index]) === true) {
                this.generate_food()
            }
        }
    }

    check_food() {
        // Check if snake ate food
        if (this.snake[0].every((val, index) => val === this.food[index]) === true) {
            this.generate_food()
            this.snake.push(this.snake[this.snake.length - 1])
            this.score += 1
            document.getElementById('score').innerHTML = this.score
        }
    }
}

let game

const startBtn = document.getElementById('start')

startBtn.addEventListener('click', () => {
    startBtn.disabled = true
    game = new Game()
})

document.addEventListener('keydown', (e) => {
    if (game && game.moved === false) {
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

setHighScore()
