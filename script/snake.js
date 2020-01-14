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

  get head(){
    const snakeHead = this.location[this.location.length - 1]
    return snakeHead.slice();
  }

  isOnRow(row){
    const [headX, headY] = this.head;
    return headY == row;
  }

  isOnCol(col){
   const [headX, headY] = this.head;
   return headX == col; 
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  isInDirection(direction){
    return this.direction.heading == direction;
  }

  randomlyTurnLeft(){
    let x = getRandomNum(NUM_OF_COLS);
    if (x > 20) {
      this.turnLeft();
    }
  }

  hasEatFood(food){
    return this.head.every((pos, idx) => pos == food[idx]);
  }

  move() {
    const [headX, headY] = this.head;
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow(food){
    if(food.name == 'apple'){
      return;
    }
    this.positions.unshift(this.previousTail)
  }

  hasTouchedBody(snake){
    const [headX, headY] = this.head;
    let snakeBody = snake.location;
    if(this.species === snake.species){
     snakeBody = this.location.slice(0,-1);
    }
    return snakeBody.some((pos) => pos[0] == headX && pos[1] == headY);
  }
}
