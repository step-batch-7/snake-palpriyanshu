class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.previousFood =new Food(0,0);
    this.score = new Score();
    this.previousHead = [0,0];
  }

  generateFood(){
    this.previousFood = this.food;
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId);
  }

  hasSnakeEatFood(snake){
    return snake.hasEatFood(this.food.position);
  }

  update(){
    this.snake.move();
    this.ghostSnake.move();
    if(this.hasTouchedBoundary(this.ghostSnake)){
      this.ghostSnake.turnLeft();
    }
    if(this.hasSnakeEatFood(this.snake)){
      this.generateFood();
      this.snake.grow();
      this.score.increment(5);
    }

    if(this.hasSnakeEatFood(this.ghostSnake)){
      this.generateFood();
    }
  }

  hasTouchedBoundary(snake) {
    let limits = [NUM_OF_COLS, NUM_OF_ROWS];
    if(snake == this.ghostSnake){
      limits =  [NUM_OF_COLS -1, NUM_OF_ROWS-1];
    }
    const isTopTouched = snake.isOnRow(0) && snake.isInDirection(NORTH);
    const isBottomTouched = snake.isOnRow(limits[1]) && snake.isInDirection(SOUTH);
    const isLeftTouched = snake.isOnCol(0) && snake.isInDirection(WEST);
    const isRightTouched = snake.isOnCol(limits[0]) && snake.isInDirection(EAST);
    return isTopTouched || isBottomTouched || isRightTouched || isLeftTouched;
  }
  
  get isOver(){
    return (
      this.snake.hasTouchedBody(this.snake) 
      || this.hasTouchedBoundary(this.snake)
      || this.snake.hasTouchedBody(this.ghostSnake)
    );
  }
}
