const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
canvas.width=800; canvas.height=600;

const spaceship=new Image(); spaceship.src='assets/spaceship.png';
const obstacle=new Image(); obstacle.src='assets/obstacle.png';
const jumpSound=new Audio('assets/jump.wav');

let x=100,y=500,vY=0;
const gravity=0.6,jump=-12;
let obsArr=[],score=0,gameOver=false;

function createObstacle(){let h=Math.random()*100+50;obsArr.push({x:canvas.width,y:canvas.height-h,width:50,height:h});}

function update(){
  if(gameOver) return;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  vY+=gravity; y+=vY;
  if(y+50>canvas.height){y=canvas.height-50;vY=0;gameOver=true;alert('Game Over! Score:'+score);}
  ctx.drawImage(spaceship,x,y,50,50);
  if(Math.random()<0.01) createObstacle();
  for(let i=obsArr.length-1;i>=0;i--){
    obsArr[i].x-=5;
    ctx.drawImage(obstacle,obsArr[i].x,obsArr[i].y,obsArr[i].width,obsArr[i].height);
    if(x<obsArr[i].x+obsArr[i].width && x+50>obsArr[i].x && y<obsArr[i].y+obsArr[i].height && y+50>obsArr[i].y){gameOver=true;alert('Game Over! Score:'+score);}
    if(obsArr[i].x+obsArr[i].width<0){obsArr.splice(i,1);score++;}
  }
  ctx.fillStyle='white'; ctx.font='24px Arial'; ctx.fillText('Score: '+score,10,30);
  requestAnimationFrame(update);
}

// 触屏跳跃
canvas.addEventListener('touchstart',()=>{vY=jump;jumpSound.play();});
update();