const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5
};

let keys = {};
let obstacles = [];
let score = 0;
let gameOver = false;

// 监听键盘事件
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// 创建障碍物
function createObstacle() {
    const width = Math.random() * 50 + 30;
    const x = Math.random() * (canvas.width - width);
    const height = 20;
    const speed = Math.random() * 3 + 2;
    obstacles.push({ x, y: -height, width, height, speed });
}

// 更新游戏状态
function update() {
    if(gameOver) return;

    // 玩家移动
    if(keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if(keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;

    // 障碍物移动
    obstacles.forEach(ob => {
        ob.y += ob.speed;
        // 撞到玩家
        if(
            player.x < ob.x + ob.width &&
            player.x + player.width > ob.x &&
            player.y < ob.y + ob.height &&
            player.y + player.height > ob.y
        ) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
        }
    });

    // 移除超出画布的障碍物
    obstacles = obstacles.filter(ob => ob.y < canvas.height);

    // 增加分数
    score++;
    document.getElementById('score').textContent = 'Score: ' + score;

    // 随机生成障碍物
    if(Math.random() < 0.02) createObstacle();
}

// 绘制游戏
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制玩家
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 绘制障碍物
    obstacles.forEach(ob => {
        ctx.fillStyle = 'green';
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
    });
}

// 游戏循环
function gameLoop() {
    update();
    draw();
    if(!gameOver) requestAnimationFrame(gameLoop);
}

// 启动游戏
gameLoop();