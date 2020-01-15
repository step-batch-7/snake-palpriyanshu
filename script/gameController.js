const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const getRandomNum = (num) => Math.floor(Math.random() * num);

const GRID_ID = 'grid';
const SCORE_BAR = 'score';

const getGrid = () => document.getElementById(GRID_ID);
const getScoreBar = () => document.getElementById(SCORE_BAR);
const getScoreBoard = () => document.getElementsByClassName('hidden')[0];

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
  for (let row = 0; row < NUM_OF_ROWS; row++) {
    for (let col = 0; col < NUM_OF_COLS; col++) {
      createCell(grid, col, row);
    }
  }
};

const displayScores = function(score){
  const scoreBar = getScoreBar();
  scoreBar.innerText = `scores: ${score}`;
};

const eraseTail = function(snake) {
  const [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snake.species);
  });
};

const drawFood = function(food){
  const [colId, rowId] = food.position();
  const cell = getCell(colId, rowId);
  cell.classList.add(food.name);
};

const eraseFood = function(food) {
  const [foodColId, foodRowId] = food.position();
  const cell = getCell(foodColId, foodRowId);
  cell.classList.remove(food.name);
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

const animateSnake = function(snake, ghostSnake){
  moveAndDrawSnake(snake);
  moveAndDrawSnake(ghostSnake);
};

const animateFood = function(game){
  eraseFood(game.previousFood);
  drawFood(game.food);
};

const displayGameOver = () => {
  const scoreBoard = getScoreBoard();
  scoreBoard.style.display = 'flex';
};

const setUp = function(game){
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake);
  drawSnake(game.ghostSnake);
  drawFood(game.food);
  displayScores(game.score.scores);
};

const drawGame = function(game){
  animateSnake(game.snake, game.ghostSnake);
  animateFood(game);
  displayScores(game.score.scores);
};

const initFood = () => {
  const type = {name: 'food', creditPoints: 5, energyLevel: 1};
  return {colId: getRandomNum(NUM_OF_COLS), 
    rowId: getRandomNum(NUM_OF_ROWS), 
    type};
};

const initGame = function(){
  const snake1Position = [[40, 25], [41, 25], [42, 25]];
  const snake = {position: snake1Position, direction: SOUTH, type: 'snake'}; 
  const snake2Position = [[40, 30], [41, 30], [42, 30]];
  const ghostSnake = {position: snake2Position, direction: EAST, type: 'ghost'};
  const food = initFood();
  return new Game(snake, ghostSnake, food);
};

const main = function() {
  const game = initGame();
  setUp(game);
  const ghostSnakeMovement = setInterval(() => {
    return game.randomlyTurnLeft();
  }
  , 500);
  const updatedGame = setInterval(() => {
    game.update();
    if(game.isOver){
      clearInterval(updatedGame);
      clearInterval(ghostSnakeMovement);
      displayGameOver(game);
      return;
    }
    drawGame(game);
  }, 100);
};

window.onload = main;
