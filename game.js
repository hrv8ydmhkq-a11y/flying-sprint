const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 180, y: 500, width: 40, height: 40, speed: 5 };
let keys = {};
let obstacles = [];
let score = 0;

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function createObstacle() {
    let x = Math.random() * (canvas.width - 40);
    obstacles.push({x, y: 0, width: 40, height: 40});
}

function update() {
    if(keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if(keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;

    obstacles.forEach(obs => obs.y += 3);

    // Collision detection
    obstacles.forEach(obs => {
        if(player.x < obs.x + obs.width &&
           player.x + player.width > obs.x &&
           player.y < obs.y + obs.height &&
           player.y + player.height > obs.y) {
            alert("Game Over! Score: " + score);
            obstacles = [];
            score = 0;
        }
    });

    obstacles = obstacles.filter(obs => obs.y < canvas.height);
    score++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = 'green';
    obstacles.forEach(obs => ctx.fillRect(obs.x, obs.y, obs.width, obs.height));

    // Draw score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText("Score: " + score, 10, 30);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

setInterval(createObstacle, 1500);
loop();