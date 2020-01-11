const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
}

class Food {
  constructor(colId,rowId) {
    this.colId = colId;
    this.rowId = rowId;
  }

  get position() {
    return [this.colId,this.rowId]
  }
}

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const getRandomNum = (num) => Math.floor(Math.random() * num);


class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }

  generateFood(){
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId);
  }

  get hasSnakeEatFood(){
    const [foodColId, FoodRowId] = this.food.position;
    const snakePos = this.snake.location;
    const [snakeColId, snakeRowId] = snakePos[snakePos.length - 1];
    return foodColId == snakeColId && FoodRowId == snakeRowId;
   }
}

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food) {
  let [colId, rowId] = food.position;
  const cell = getCell(colId, rowId);
  cell.classList.add('food');
};


const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const initSnake = () => {
  const snakePosition = [[40, 25],[41, 25],[42, 25]];
  return  new Snake(snakePosition, new Direction(EAST),'snake'); 
};

const initGhostSnake = () => {
  const snakePosition =[[40, 30],[41, 30],[42, 30]];
  return  new Snake(snakePosition, new Direction(SOUTH),'ghost');
};

const setUp = (game)=> {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
};

const animateSnake = function(snake, ghostSnake){
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const animateGame = function(game){
  animateSnake(game.snake, game.ghostSnake)
  if(game.hasSnakeEatFood){
    animateFood(game)
  }
};

const randomlyTurnLeft = function(snake){
let x = getRandomNum(NUM_OF_COLS);
  if (x > 50) {
    snake.turnLeft();
  };
};

const eraseFood = function(food) {
  const cell = getCell(food.colId, food.rowId);
  cell.classList.remove('food');
};
 
const animateFood = function(game){
  eraseFood(game.food);
  game.generateFood();
  drawFood(game.food)
};

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();

  const food = new Food(5, 5);
  const game = new Game(snake, ghostSnake, food);
  setUp(game);

  setInterval(animateGame, 200, game);
  setInterval(randomlyTurnLeft, 500, ghostSnake);

};
