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
    const snakeHead = this.location[this.location.length - 1];
    return snakeHead.slice();
  }

  isOnRow(row){
    return this.head[1] === row;
  }

  isOnCol(col){
    return this.head[0] === col; 
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  isInDirection(direction){
    return this.direction.heading === direction;
  }

  didEatFood(food){
    return this.head.every((pos, idx) => pos === food[idx]);
  }

  move() {
    const [headX, headY] = this.head;
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  consume(energyLevel){
    if(energyLevel === 0){
      return;
    }
    this.positions.unshift(this.previousTail);
  }

  hasTouchedBody(snake){
    const [headX, headY] = this.head;
    let snakeBody = snake.location;
    if(this.species === snake.species){
      snakeBody = this.location.slice(0, -1);
    }
    return snakeBody.some(([x, y]) => x === headX && y === headY);
  }
}
