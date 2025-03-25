const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d"); //context
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";

let tickSpeed = 150;
const unitSize = 25;
let running = false;
let paused = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let keyPressed;

let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

let gameInterval; 

window.addEventListener("keydown", changeDirection);

resetBtn.addEventListener("click", () => {
    resetGame(); 
});

gameStart();

function gameStart() {
    running = true;
    paused = false;
    score = 0;
    tickSpeed = 150;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick(); 
}

function nextTick() {
    if (!running) {
        displayGameOver();
        return;
    }
    if (paused) {
        displayPauseMessage();
        clearInterval(gameInterval);
        return;
    }
    else{
        gameInterval = setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, tickSpeed);
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    drawGrid(); // Add grid drawing
}

function createFood() {
    function randomFood(min, max) {
        return Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    keyPressed = event.keyCode;
    
    if (keyPressed === 32) {
        paused = !paused;
        if (!paused) {
            nextTick(); 
        }
        return;
    } 
    
    const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40;
    const goingUp = (yVelocity === -unitSize);
    const goingDown = (yVelocity === unitSize);
    const goingRight = (xVelocity === unitSize);
    const goingLeft = (xVelocity === -unitSize);

    switch (true) {
        case (keyPressed === LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed === UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed === RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;  
            break;
        case (keyPressed === DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkGameOver() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= gameWidth ||
        snake[0].y < 0 ||
        snake[0].y >= gameHeight
    ) {
        running = false;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            running = false;
        }
    }
}

function drawGrid(){
    ctx.strokeStyle = "#bdc3c7"; // Light gray color for the grid
    for(let x = 0; x < gameWidth; x += unitSize){
        for(let y = 0; y < gameHeight; y += unitSize){
            ctx.strokeRect(x, y, unitSize, unitSize);
        }
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
}

function displayPauseMessage() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME PAUSED!", gameWidth / 2, gameHeight / 2);
}

function resetGame() {
    running = true;
    paused = false;
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    
    clearInterval(gameInterval);
    
    gameStart();
}
