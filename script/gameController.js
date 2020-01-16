const GRID_ID = 'grid';
const SCORE_BAR = 'score';

const getRandomNum = (num) => Math.floor(Math.random() * num);

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

const createGrids = function(gridSize) {
  const [numOfCols, numOfRows] = gridSize;
  const grid = getGrid();
  for (let row = 0; row < numOfRows; row++) {
    for (let col = 0; col < numOfCols; col++) {
      createCell(grid, col, row);
    }
  }
};

const initFood = function(gridSize){
  const [cols, rows] = gridSize;
  const type = {name: 'food', points: 5, growthFactor: 1};
  return {colId: getRandomNum(cols), rowId: getRandomNum(rows), type};
};

const initSnake = function(){
  const snakePosition = [[40, 25], [41, 25], [42, 25]];
  return {position: snakePosition, direction: SOUTH, type: 'snake'};
};

const initGhostSnake = function(){
  const snakePosition = [[40, 30], [41, 30], [42, 30]];
  return {position: snakePosition, direction: EAST, type: 'ghost'};
};

const eraseTail = function(status) {
  const [colId, rowId] = status.location[0];
  const cell = getCell(colId, rowId);
  cell.classList.remove(status.species);
};

const drawSnake = function(status) {
  status.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell.classList.add(status.species);
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

const handleKeyPress = (game) => {
  const keyValue = event.keyCode;
  if(keyValue === 37){
    game.turnSnakeLeft();
    return;
  }
  game.turnSnakeRight();
};

const attachEventListeners = game => {
  document.body.onkeydown = handleKeyPress.bind(null, game);
};

const displayGameOver = () => {
  const scoreBoard = getScoreBoard();
  scoreBoard.style.display = 'flex';
};

const endGame = function(intervals){
  intervals.forEach((interval) => clearInterval(interval));
};

const displayScores = function(score){
  const scoreBar = getScoreBar();
  scoreBar.innerText = `scores: ${score}`;
};

const drawGame = function(game){
  game.status.forEach((status) => drawSnake(status));
  drawFood(game.foodStatus);
  displayScores(game.getScores());
};

const erase = function(game){
  game.status.forEach((status) => eraseTail(status));
  eraseFood(game.foodStatus);
};

const updateGame = function(game, updatedGame, ghostSnakeMovement){
  erase(game);
  game.update();
  if(game.isOver){
    endGame([updatedGame, ghostSnakeMovement]);
    displayGameOver(game);
    return;
  }
  drawGame(game);
};

const setUp = function(game){
  attachEventListeners(game);
  createGrids(game.grid);
  drawGame(game);
};

const initGame = function(){
  const gridSize = [100, 60];
  const snake = initSnake();
  const ghostSnake = initGhostSnake();
  const food = initFood(gridSize);
  return new Game(gridSize, snake, ghostSnake, food);
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
