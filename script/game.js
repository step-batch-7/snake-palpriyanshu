const generateFoodType = function(){
  const type1 = {name: 'food', creditPoints: 5, energyLevel: 1};
  const type2 = {name: 'food', creditPoints: 5, energyLevel: 1};
  const type3 = {name: 'apple', creditPoints: 10, energyLevel: 0};
  const type4 = {name: 'apple', creditPoints: 10, energyLevel: 0};
  const type5 = {name: 'food', creditPoints: 5, energyLevel: 0};
  return [type1, type2, type3, type4, type5];
};

const getFoodType = function(){
  const foodType = generateFoodType();
  const idx = getRandomNum(foodType.length);
  return foodType[idx];
};

class Game {
  constructor(snake, ghostSnake, food) {
    this.snake = new Snake(snake.position, new Direction(snake.direction), snake.type);
    this.ghostSnake = new Snake(ghostSnake.position, new Direction(ghostSnake.direction), ghostSnake.type);
    this.food = new Food(food.colId, food.rowId, food.type);
    this.score = new Score();
  }

  generateFood(){
    this.previousFood = this.food;
    const rowId = getRandomNum(NUM_OF_ROWS);
    const colId = getRandomNum(NUM_OF_COLS);
    this.food = new Food(colId, rowId, getFoodType());
  }

  didSnakeEatFood(snake){
    return snake.didEatFood(this.food.position);
  }

  randomlyTurnLeft(){
    const headX = getRandomNum(NUM_OF_COLS);
    if (headX > 20) {
      this.ghostSnake.turnLeft();
    }
  }

  get foodStatus() {
    return {
      location: this.food.position.slice(),
      name: this.food.getName()
    };
  }

  update(){
    this.snake.move();
    this.ghostSnake.move();
    if(this.hasTouchedBoundary(this.ghostSnake)){
      this.ghostSnake.turnLeft();
    }

    if(this.didSnakeEatFood(this.snake)){
      this.score.increment(this.food.getCreditPoints());
      this.snake.consume(this.food.energy);
      this.generateFood();
    }

    if(this.didSnakeEatFood(this.ghostSnake)){
      this.generateFood(); 
    }
  }

  hasTouchedBoundary(snake) {
    let limits = [NUM_OF_COLS, NUM_OF_ROWS, -1];
    if(snake == this.ghostSnake){
      limits = [NUM_OF_COLS - 1, NUM_OF_ROWS - 1, 0];
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
      || this.snake.hasTouchedBody(this.ghostSnake)
      || this.ghostSnake.hasTouchedBody(this.snake) 
      || this.hasTouchedBoundary(this.snake)
    );
  }
}
