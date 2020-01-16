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

const eraseTail = function(snakeStatus) {
  const [colId, rowId] = snakeStatus.location[0];
  const cell = getCell(colId, rowId);
  cell.classList.remove(snakeStatus.species);
};

const drawSnake = function(snakeStatus) {
  snakeStatus.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(snakeStatus.species);
  });
};

const drawFood = function(foodStatus){
  const [colId, rowId] = foodStatus.location;
  const cell = getCell(colId, rowId);
  cell.classList.add(foodStatus.name);
};

const eraseFood = function(foodStatus) {
  const [foodColId, foodRowId] = foodStatus.location;
  const cell = getCell(foodColId, foodRowId);
  cell.classList.remove(foodStatus.name);
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const initFood = () => {
  const type = {name: 'food', creditPoints: 5, energyLevel: 1};
  return {colId: getRandomNum(NUM_OF_COLS), 
    rowId: getRandomNum(NUM_OF_ROWS), 
    type};
};

const displayGameOver = () => {
  const scoreBoard = getScoreBoard();
  scoreBoard.style.display = 'flex';
};

const endGame = function(updatedGame, ghostSnakeMovement){
  clearInterval(updatedGame);
  clearInterval(ghostSnakeMovement);
};

const displayScores = function(score){
  const scoreBar = getScoreBar();
  scoreBar.innerText = `scores: ${score}`;
};

const drawGame = function(game){
  drawSnake(game.snake.snakeStatus);
  drawSnake(game.ghostSnake.snakeStatus);
  drawFood(game.foodStatus);
  displayScores(game.score.scores);
};

const erase = function(game){
  eraseTail(game.snake.snakeStatus);
  eraseTail(game.ghostSnake.snakeStatus);
  eraseFood(game.foodStatus);
};

const updateGame = function(game, updatedGame, ghostSnakeMovement){
  erase(game);
  game.update();
  if(game.isOver){
    endGame(updatedGame, ghostSnakeMovement);
    displayGameOver(game);
    return;
  }
  drawGame(game);
};

const setUp = function(game){
  attachEventListeners(game.snake);
  createGrids();
  drawSnake(game.snake.snakeStatus);
  drawSnake(game.ghostSnake.snakeStatus);
  drawFood(game.foodStatus);
  displayScores(game.score.scores);
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
    updateGame(game, updatedGame, ghostSnakeMovement);
  }, 100);
};

window.onload = main;
