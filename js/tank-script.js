var tankWidth = 100, tankHeight = 228, canvasWidth, canvasHeigth; 
var tankPosition, fire=false;
var spiders = [], score = 0; 
let img; let count = 0, gameRunning = false; 
var tank, movingSpider, movingSpider2, noOfSpiders=100, rangeOfSpiders = 2000, gameOverMessage = '', highScore = 0;

function preload() {
  img = loadImage('../assets/spider.png');
  img2 = loadImage('../assets/dead-placeholder.png');
  bgImg = loadImage('../assets/tank-bg-3.png');
  tank = loadAnimation('../assets/spaceship-1.png','../assets/spaceship-7.png');
  movingSpider = loadAnimation('../assets/spider-1.png','../assets/spider-5.png'); 
  movingSpider2 = loadAnimation('../assets/dead-placeholder.png','../assets/dead-placeholder.png');
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeigth = windowHeight;

  for (let i = 0 ; i < noOfSpiders ; i++) {
    const spider = {
      image:movingSpider, x:30*(Math.floor(Math.random()*((windowWidth-tankWidth-20)/30)))+tankWidth/2, y:10*(Math.floor(Math.random()*-1*rangeOfSpiders/10)), life:3
    }
    spiders.push(spider);
  }

  createCanvas(canvasWidth, canvasHeigth-5);
  frameRate(6);
  tankPosition = canvasWidth/2-tankWidth/2;
}

function reset() {
  for (let i = 0 ; i < noOfSpiders ; i++) {
      spiders[i].image = movingSpider, spiders[i].x=Math.floor(Math.random()*(windowWidth-tankWidth-20))+tankWidth/2, spiders[i].y=Math.floor(Math.random()*-400);
  }
  tankPosition = canvasWidth/2-tankWidth/2;
  score=0;
  gameOverMessage = ' ';
  gameRunning = true;
}

function draw() {
  background(bgImg);
  fill(255);
  noStroke();
  createTank();
  createTarget();
  targetMovement();
  playGame();
  if(fire) {
    tankFire();
  }
  scoring();
  highestScore();
}

function createTank() {
  // let tankRatio = 0.7, tankBodyHeigth = tankRatio*tankHeight, tankNozzleHeight = tankHeight - tankBodyHeigth;
  animation(tank,tankPosition+tankWidth/2,canvasHeigth-tankHeight/2);
  // image(tank,tankPosition,canvasHeigth-tankHeight,tankWidth,tankHeight);
  // rect(tankPosition+tankWidth/2-10,canvasHeigth-tankHeight,20,tankNozzleHeight,2,2,0,0)
}

function keyPressed() {
  let tankSpeed = 20;
  if (keyCode === LEFT_ARROW && tankPosition >= 10) {
    tankPosition -= tankSpeed;
  } else if (keyCode === RIGHT_ARROW && tankPosition <= canvasWidth-tankWidth-10) {
    tankPosition += tankSpeed;
  } else if (keyCode === UP_ARROW) {
    fire = true;
  }
}

function keyTyped() {
  if(key == 'r' || key == 'R') {
    reset();
  }
}

function tankFire() {
  stroke(255);
  strokeWeight(4);
  line(tankPosition + tankWidth/2-2, canvasHeigth - tankHeight, tankPosition + tankWidth/2-1, 0);
  fire = false;
}

function createTarget() {
  for(let i = 0 ; i<spiders.length; i++) {
    animation(spiders[i].image, spiders[i].x, spiders[i].y, 40, 40);
    // image(spiders[i].image, spiders[i].x, spiders[i].y, 40, 40);
  }
}

function playGame() {
  for(let i = 0; i<spiders.length; i++) {
    if(tankPosition + tankWidth/2-2 >= spiders[i].x && tankPosition + tankWidth/2-2 <= spiders[i].x+40 && fire === true && spiders[i].y > 0 && spiders[i].y < windowHeight-100) {
      spiders[i].image = movingSpider2;
    }
  }
  
  gameRunning = false;

  for(let i = 0; i<spiders.length; i++) {
    if(spiders[i].y < windowHeight) {
      gameRunning = true;
    }
  }
}

function targetMovement() { 
  if(count == 6) {
    for (let i = 0; i<spiders.length ; i++) {
      spiders[i].y += 40;
    }
  count = 0;
  } else {
    count ++;
  }
// console.log('Count: '+count + 'Spider' + spiders);
}

function scoring() {
  textSize(40);
  text('Your Score:', 100, windowWidth/2-150);
  text(score,100,windowWidth/2-100);
  score = 0;
  for(let i = 0; i < spiders.length; i++) {
    if(spiders[i].image == movingSpider2){
      score++;
    }
  }

  if(!gameRunning) {
    gameOverMessage = 'Game Over. Press r to restart';
    gameRunning = true;
    
    // for(let i = 0; i < spiders.length; i++) {
    //   if(spiders[i].image == movingSpider2){
    //     score++;
    //   }
    // }
  }
  text(gameOverMessage, windowHeight/2, windowWidth/2-100);
}

function highestScore() {
  if(score>highScore) {
    highScore=score;
  }
  text('High score:', windowWidth-300, windowWidth/2-150);
  text(highScore,windowWidth-300,windowWidth/2-100);
}