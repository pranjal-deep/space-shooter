var canvasWidth, canvasHeight; 
var restart, winner;

function setup() {
  canvasWidth = windowWidth; canvasHeight = windowHeight*0.6;
  createCanvas(canvasWidth, windowHeight-10);
  noStroke();
}

function draw() {
  background(3, 252, 111);
  ball();
  bats();
  scoring();
  scoreCard();
//   noLoop();
}
  
function keyTyped() {
  if(key == 'r' || key == 'R') {
    reset();
  }
}


function reset() {
  posX=75;
  posY=50;
  rect1Y=150;
  rect2Y=150;
  pointL=0;
  pointR=0;
//   delayTime(0.5);
}

var ballSpeed = 10;
var dirX=true, dirY=true, posX=75,posY=50,circleDim=50,movX=4;

function ball() {
console.log('ball');
  if(dirY) {
      posY+=ballSpeed;
    } else {
      posY-=ballSpeed;
  }
  if(posY>canvasHeight-circleDim/2 || posY<circleDim/2){
    dirY=!dirY;
    }
    if(posX>canvasWidth-circleDim/2 || posX<circleDim/2){
    dirX=!dirX;
  }  
  if(dirX){
      posX+=ballSpeed;
    } else {
      posX-=ballSpeed;
  }
  fill(255);
  circle(posX,posY,circleDim);
}

var rect1X = 0, rect2X = 780, rect1Y = 150, rect2Y=150, rectMov=30,rectWidth=20,rectHeight=100, rectd = canvasWidth-20;

function bats() {
fill(235, 122, 52);
rect(0,rect1Y,rectWidth,rectHeight);
rect(canvasWidth-rectWidth,rect2Y,rectWidth,rectHeight);
}

function keyPressed() {
    if (keyCode == UP_ARROW && rect2Y>0) {
      rect2Y-=rectMov;
      } else if (keyCode == DOWN_ARROW && rect2Y<300) {
      rect2Y+=rectMov;
      } else if (keyCode == SHIFT && rect1Y>0) { 
      rect1Y-=rectMov;
      } else if (keyCode == CONTROL && rect1Y<300) { 
      rect1Y+=rectMov;
      }
}

var pointL=0, pointR=0, points = " : ",leftWins="Left Wins",rightWins="Right Wins";

function scoring() {

  if(posX<=rectWidth+circleDim/2 && ((posY+circleDim/2)<rect1Y || (posY-circleDim/2)>rect1Y+100)){
    pointR++;
    resetBallPos();
  } else if((posX+circleDim/2>=canvasWidth-rectWidth) && ((posY+circleDim/2)<rect2Y || (posY-circleDim/2)>rect2Y+100)){
    pointL++;
    resetBallPos();
  }
}

function scoreCard() {
  fill(255);
  rect(0, canvasHeight, canvasWidth, windowHeight*0.4);
  fill(0);
  rect(10, canvasHeight+10, canvasWidth-20, windowHeight*0.4-20);

  fill(255);
  textSize(26);
  text(pointL, windowWidth/2-100, windowHeight-150);
  text(points, windowWidth/2, windowHeight-150);
  text(pointR, windowWidth/2+100, windowHeight-150);

  if (pointL==7) {
    winner=leftWins;
    text(winner,370,580);
    // delayTime(1);
    reset();
  } else if (pointR==7) {
    winner=rightWins;
    text(winner,370,580);
    // delayTime(1);
    reset();
  }
}

function resetBallPos() {
//   delayTime(3);
  posX=canvasWidth/2-circleDim/2;
  posY=canvasHeight/2;
  rect1Y=150;
  rect2Y=150; 
}

//Processing code ends

