const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 300, width: 50, height: 50, dy: 0, gravity: 0.7, jumpPower: -12 };
let obstacles = [];
let score = 0;
let gameSpeed = 4;
let keys = {};

const spaceshipImg = new Image();
spaceshipImg.src = 'assets/spaceship.png';

const obstacleImg = new Image();
obstacleImg.src = 'assets/obstacle.png';

document.addEventListener('keydown', e => { keys[e.code] = true; });
document.addEventListener('keyup', e => { keys[e.code] = false; });

function createObstacle() {
    let height = 50 + Math.random() * 50;
    obstacles.push({ x: canvas.width, y: canvas.height - height, width: 50, height: height });
}

function updatePlayer() {
    if (keys['Space'] && player.y === 300) {
        player.dy = player.jumpPower;
        // 可加音效播放
    }
    player.dy += player.gravity;
    player.y += player.dy;
    if (player.y > 300) player.y = 300;
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= gameSpeed;
        if (obstacles[i].x + obstacles[i].width < 0) obstacles.splice(i, 1);
    }
    if (Math.random() < 0.02) createObstacle();
}

function checkCollision() {
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x &&
            player.y < obs.y + obs.height &&
            player.y + player.height > obs.y
        ) {
            alert('Game Over! Your score: ' + score);
            obstacles = [];
            score = 0;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Player
    ctx.drawImage(spaceshipImg, player.x, player.y, player.width, player.height);
    // Obstacles
    for (let obs of obstacles) {
        ctx.drawImage(obstacleImg, obs.x, obs.y, obs.width, obs.height);
    }
    // Score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

function loop() {
    updatePlayer();
    updateObstacles();
    checkCollision();
    draw();
    score++;
    requestAnimationFrame(loop);
}

loop();