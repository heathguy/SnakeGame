/**
 Snake Game Clone
**/

var tiles = [];
var wholeSnake = [];
var snakeDir;
var food;

var mdir;

var rows, cols;
var tileSize = 40;

var gameOver;
var gamePaused;
var gameSpeed;
var gameScore = 0;

function setup() {
	//canvas must be a square or be evenly divisible by tile size
  createCanvas(400, 400);
  background(51);
	
	gameSpeed = width/tileSize*0.25
  frameRate(gameSpeed);

  rows = height / tileSize;
  cols = width / tileSize;

  // start snake moving to the right
  snakeDir = createVector(tileSize, 0);
  mdir = 3;
  sx = tileSize;
  sy = tileSize;

  var snakeHead = new Snake(sx, sy, tileSize, 1, sx+tileSize, sy);
  snakeHead.movementDir = mdir; // set initial direction to the right
  wholeSnake.push(snakeHead);

  gameOver = false;
  gamePaused = true;

  food = createFood();
}

function getRandomInt(min, max) {
  return floor(random() * (max - min + 1) + min);
}

function getRandomTileSize(min, max) {
  return getRandomInt(min / tileSize, max / tileSize) * tileSize;
}

function createFood() {
	var fx;
	var fy;
	var foundValidPos = false;
	while(!foundValidPos) {
		 // generate a random point 
		fx = getRandomTileSize(0, width - tileSize);
		fy = getRandomTileSize(0, height - tileSize);
		
		//easier game keep food off edges
		fx = getRandomTileSize(tileSize, width - tileSize*2);
		fy = getRandomTileSize(tileSize, height - tileSize*2);
		
		for (var i = 0; i < wholeSnake.length; i++) {
			if( (fx == wholeSnake[i].pos.x) && (fy == wholeSnake[i].pos.y) ){
				foundValidPos = false;
				break;
			} else {
				foundValidPos = true;
			}
		}
	}
  var fpos = createVector(fx, fy);
  console.log(fx + ", " + fy);
  return fpos;
}

function mousePressed() {
  // do nothing
  if (gamePaused) {
    gamePaused = false;
  } else {
    gamePaused = true;
  }
}

function keyPressed() {
  // 0; up, 1: down, 2: left, 3: right
  //mdir = 0;
  switch (keyCode) {
    case RIGHT_ARROW:
      snakeDir.x = tileSize;
      snakeDir.y = 0;
      mdir = 3;
      break;
    case DOWN_ARROW:
      snakeDir.x = 0;
      snakeDir.y = tileSize;
      mdir = 1;
      break;
    case LEFT_ARROW:
      snakeDir.x = (tileSize * -1);
      snakeDir.y = 0;
      mdir = 2;
      break;
    case UP_ARROW:
      snakeDir.x = 0;
      snakeDir.y = (tileSize * -1);
      mdir = 0;
      break;
    default:
      gamePaused = false;
  }
}

function draw() {
  background(51);

  if (!gameOver) {
    //fill(255, 0, 0);
    // fill(51);
    // stroke(0);
    // var startX;
    // var startY;
    // for (var i = 0; i < cols; i++) {
    //   startX = i * tileSize;
    //   for (var j = 0; j < rows; j++) {
    //     startY = j * tileSize;
    //     rect(startX, startY, startX + tileSize, startY + tileSize);
    //   }
    //   j = j * tileSize;
    // }

    // do not move the snake if the game is paused
    if (!gamePaused) {
			var nextX = wholeSnake[0].pos.x; // store head's current pos
			var nextY = wholeSnake[0].pos.y;
			var currX = 0;
			var currY = 0;
			wholeSnake[0].moveHead(snakeDir, mdir); // move head of snake
			//move rest of body
			for (var i = 1; i < wholeSnake.length; i++) {
				currX = wholeSnake[i].pos.x;
				currY = wholeSnake[i].pos.y;
				wholeSnake[i].pos.x = nextX;
				wholeSnake[i].pos.y = nextY;
				nextX = currX;
				nextY = currY;
				// check for collision with the snake body
				if (wholeSnake[0].pos.x == wholeSnake[i].pos.x && wholeSnake[0].pos.y == wholeSnake[i].pos.y) {
            gameOver = true;
            break;
          }
			}
    }
    // show the food piece
    fill(200, 200, 100);
    rect(food.x, food.y, tileSize, tileSize);


    wholeSnake[0].showHead();
    for (var j = 1; j < wholeSnake.length; j++) {
      wholeSnake[j].showBody();
    }
    if (wholeSnake.length > 1) {
      wholeSnake[wholeSnake.length - 1].showTail(wholeSnake[wholeSnake.length -
          2]
        .movementDir);
    }

    // check eat food
    if (wholeSnake[0].pos.x == food.x && wholeSnake[0].pos.y == food.y) {
      //console.log("GOT FOOD!");
      var snakePiece;
      // grow the snake
      //add based on current movement direction mdir
      switch (mdir) {
        case 0: // moving up
          snakePiece = new Snake(wholeSnake[wholeSnake.length - 1].pos.x,
            wholeSnake[wholeSnake.length - 1].pos.y + tileSize, tileSize, 2,
            snakeDir.x, snakeDir.y);
          break;
        case 1: // moving down
          snakePiece = new Snake(wholeSnake[wholeSnake.length - 1].pos.x,
            wholeSnake[wholeSnake.length - 1].pos.y - tileSize, tileSize, 2,
            snakeDir.x, snakeDir.y);
          break;
        case 2: // movking left
          snakePiece = new Snake(wholeSnake[wholeSnake.length - 1].pos.x +
            tileSize,
            wholeSnake[wholeSnake.length - 1].pos.y, tileSize, 2,
            snakeDir.x, snakeDir.y);
          break;
        case 3: // moving right
          snakePiece = new Snake(wholeSnake[wholeSnake.length - 1].pos.x -
            tileSize,
            wholeSnake[wholeSnake.length - 1].pos.y, tileSize, 2,
            snakeDir.x, snakeDir.y);
          break;
        default:
      }
      wholeSnake.push(snakePiece);
      
      // Move the food to a new position and update score
      food = createFood();
      gameScore += 100;
      console.log("Score: " + gameScore);
    }

    // check edge collisions
    // if hit any edge or any part of snake body game is over
    if (wholeSnake[0].pos.x < 0 || wholeSnake[0].pos.x + tileSize > width) {
      gameOver = true;
    } else if (wholeSnake[0].pos.y < 0 || wholeSnake[0].pos.y + tileSize >
      height) {
      gameOver = true;
    } else {}

  } else {
    noLoop();
    console.log("Score: " + gameScore);
    console.log("GAME OVER!");
  }
}
