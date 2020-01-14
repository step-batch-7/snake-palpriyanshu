const getFoodType = function(){
  const foodType = generateFoodType();
  const idx = getRandomNum(foodType.length);
  return foodType[idx];
}

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood =new Food(0, 0, {name: 'food', creditPoints: 5});
    this.score = new Score();
    this.previousHead = [0,0];
  }

  generateFood(){
    this.previousFood = this.food;
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId, getFoodType());
  }

  hasSnakeEatFood(snake){
    return snake.hasEatFood(this.food.position());
  }

  update(){
    this.snake.move();
    this.ghostSnake.move();
    if(this.hasTouchedBoundary(this.ghostSnake)){
      this.ghostSnake.turnLeft();
    }

    if(this.hasSnakeEatFood(this.snake)){
      this.score.increment(this.food.getCreditPoints());
      this.snake.grow(this.food);
      this.generateFood();
    }

    if(this.hasSnakeEatFood(this.ghostSnake)){
      this.generateFood();
    }
  }

  hasTouchedBoundary(snake) {
    let limits = [NUM_OF_COLS, NUM_OF_ROWS, -1];
    if(snake == this.ghostSnake){
      limits =  [NUM_OF_COLS -1, NUM_OF_ROWS-1, 0];
    }
    const isTopTouched = snake.isOnRow(limits[2]) && snake.isInDirection(NORTH);
    const isBottomTouched = snake.isOnRow(limits[1]) && snake.isInDirection(SOUTH);
    const isLeftTouched = snake.isOnCol(limits[2]) && snake.isInDirection(WEST);
    const isRightTouched = snake.isOnCol(limits[0]) && snake.isInDirection(EAST);
    return isTopTouched || isBottomTouched || isRightTouched || isLeftTouched;
  }
  
  get isOver(){
    return (
      this.snake.hasTouchedBody(this.snake)
      ||this.snake.hasTouchedBody(this.ghostSnake)
      ||this.ghostSnake.hasTouchedBody(this.snake) 
      ||this.hasTouchedBoundary(this.snake)
    );
  }
}

