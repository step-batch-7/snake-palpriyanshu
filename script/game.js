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

  randomlyTurnLeft(){
  let x = getRandomNum(NUM_OF_COLS);
  if (x > 50) {
    this.ghostSnake.turnLeft();
  };
};


  generateFood(){
    this.previousFood = this.food;
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId);
  }

  get snakeHead(){
    const snakePos = this.snake.location;
    const snakeHead = snakePos[snakePos.length - 1]
    return snakeHead.slice();
  }

  get hasSnakeEatFood(){
    const [foodColId, FoodRowId] = this.food.position;
    const [headColId, headRowId] = this.snakeHead;
    return foodColId === headColId && FoodRowId === headRowId;
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

get hasSnakeTouchedWalls(){
  const head = this.snakeHead;
  const boundary = [NUM_OF_COLS, NUM_OF_ROWS];
  return head.some((pos, idx) => pos < 0 || pos >= boundary[idx])
}  

  get isOver(){
    return this.snake.hasTouchedItself || this.hasSnakeTouchedWalls;
  }
}
