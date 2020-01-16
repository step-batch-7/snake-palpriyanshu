const generateFoodType = function(){
  const type1 = {name: 'food', points: 5, growthFactor: 1};
  const type2 = {name: 'apple', points: 10, growthFactor: 0};
  return [type1, type2, type2, type1, type1];
};

const getFoodType = function(){
  const foodType = generateFoodType();
  const idx = getRandomNum(foodType.length);
  return foodType[idx];
};

class Game {
  #cols;
  #rows;
  #snake;
  #ghostSnake;
  #food;
  #score;
  constructor(gridSize, snake, ghostSnake, food) {
    [this.#cols, this.#rows] = gridSize.slice();
    this.#snake = new Snake(snake.position, new Direction(snake.direction), snake.type);
    this.#ghostSnake = new Snake(ghostSnake.position, new Direction(ghostSnake.direction), ghostSnake.type);
    this.#food = new Food(food.colId, food.rowId, food.type);
    this.#score = new Score();
  }

  get grid(){
    return [this.#cols, this.#rows].slice();
  }

  getScores(){
    return this.#score.scores;
  }

  turnSnakeLeft(){
    return this.#snake.turnLeft();
  }

  turnSnakeRight(){
    return this.#snake.turnRight();
  }

  generateFood(){
    const rowId = getRandomNum(this.#rows);
    const colId = getRandomNum(this.#cols);
    this.#food = new Food(colId, rowId, getFoodType());
  }

  didSnakeEatFood(snake){
    return snake.wasHeadOn(this.#food.position);
  }

  randomlyTurnLeft(){
    const headX = getRandomNum(this.#cols);
    if (headX > 20) {
      this.#ghostSnake.turnLeft();
    }
  }

  get status(){
    return [this.#snake.snakeStatus, this.#ghostSnake.snakeStatus];
  }

  get foodStatus() {
    return this.#food.status;
  }

  update(){
    this.#snake.move();
    this.#ghostSnake.move();
    if(this.hasTouchedBoundary(this.#ghostSnake)){
      this.#ghostSnake.turnLeft();
    }

    if(this.didSnakeEatFood(this.#snake)){
      this.#score.increment(this.#food.creditPoints);
      this.#snake.growBy(this.#food.growth);
      this.generateFood();
    }

    if(this.didSnakeEatFood(this.#ghostSnake)){
      this.generateFood(); 
    }
  }

  hasTouchedBoundary(snake) {
    let limits = [this.#cols, this.#rows, -1];
    if(snake == this.#ghostSnake){
      limits = [this.#cols - 1, this.#rows - 1, 0];
    }
    const isTopTouched = snake.isOnRow(limits[2]) && snake.isInDirection(NORTH);
    const isBottomTouched = snake.isOnRow(limits[1]) && snake.isInDirection(SOUTH);
    const isLeftTouched = snake.isOnCol(limits[2]) && snake.isInDirection(WEST);
    const isRightTouched = snake.isOnCol(limits[0]) && snake.isInDirection(EAST);
    return isTopTouched || isBottomTouched || isRightTouched || isLeftTouched;
  }

  get isOver(){
    return (
      this.#snake.hasTouchedBody(this.#snake)
      || this.#snake.hasTouchedBody(this.#ghostSnake)
      || this.#ghostSnake.hasTouchedBody(this.#snake) 
      || this.hasTouchedBoundary(this.#snake)
    );
  }
}
