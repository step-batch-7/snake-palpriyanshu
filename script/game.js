const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood =new Food(0,0);
    this.score = new Score();
  }

  turnSnake(snake){
    if(snake === this.snake){
      return this.snake.turnLeft();
    }
    return this.ghostSnake.turnLeft();
  }

  generateFood(){
    this.previousFood = this.food;
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId);
  }

  get hasSnakeEatFood(){
    const [foodColId, FoodRowId] = this.food.position;
    const snakePos = this.snake.location;
    const [snakeColId, snakeRowId] = snakePos[snakePos.length - 1];
    return foodColId === snakeColId && FoodRowId === snakeRowId;
  }

 update(){
    this.snake.move();
    this.ghostSnake.move();
    if(this.hasSnakeEatFood){
      this.generateFood();
      this.snake.grow();
      this.score.increment(5);
    }
  }
}

const getRandomNum = (num) => Math.floor(Math.random() * num);

const GRID_ID = 'grid';
const SCORE_BOARD = 'scoreBoard';

const getGrid = () => document.getElementById(GRID_ID);
const getScoreBoard =  () => document.getElementById(SCORE_BOARD);

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

const displayScores = function(score){
  const scoreBoard = getScoreBoard();
  scoreBoard.innerText = `scores: ${score}`;
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
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};


const setUp = (game)=> {
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
  displayScores(game.score.scores);
};

const eraseFood = function(food) {
  const [foodColId, foodRowId] = food.position;
  const cell = getCell(foodColId, foodRowId);
  cell.classList.remove('food');
};

const animateSnake = function(snake, ghostSnake){
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const animateFood = function(game){
  eraseFood(game.previousFood);
  drawFood(game.food)
};

const animateGame = function(game){
  game.update()
  animateSnake(game.snake, game.ghostSnake)
  animateFood(game);
  displayScores(game.score.scores)
};


const randomlyTurnLeft = function(game){
  let x = getRandomNum(NUM_OF_COLS);
  if (x > 50) {
    game.turnSnake('ghostSnake');
  };
};

const initSnake = () => {
  const snakePosition = [[40, 25],[41, 25],[42, 25]];
  return  new Snake(snakePosition, new Direction(EAST),'snake'); 
};

const initGhostSnake = () => {
  const snakePosition =[[40, 30],[41, 30],[42, 30]];
  return  new Snake(snakePosition, new Direction(SOUTH),'ghost');
};

const initFood = () => {
  return new Food(getRandomNum(100), getRandomNum(60));
}

const main = function() {
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = initFood();

  const game = new Game(snake, ghostSnake, food);
  setUp(game);

  setInterval(animateGame, 200, game);
  setInterval(randomlyTurnLeft, 500, game);
};