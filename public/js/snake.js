class Snake {
  #type;
  #direction;
  #positions;
  constructor(positions, direction, type) {
    this.#positions = positions.slice();
    this.#direction = direction;
    this.#type = type;
  }

  get location() {
    return this.#positions.slice();
  }

  get snakeStatus(){
    return {
      location: this.location,
      species: this.#type
    };
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
    this.#direction.turnLeft();
  }

  turnRight() {
    this.#direction.turnRight();
  }

  isInDirection(direction){
    return this.#direction.currentDirection === direction;
  }

  wasHeadOn(cell){
    return this.head.every((pos, idx) => pos === cell[idx]);
  }

  move() {
    const [headX, headY] = this.head;
    this.#positions.shift();

    const [deltaX, deltaY] = this.#direction.delta;

    this.#positions.push([headX + deltaX, headY + deltaY]);
  }

  growBy(growthFactor){
    if(growthFactor === 0){
      return;
    }
    this.#positions.unshift(this.location[0]);
  }

  hasTouchedBody(snake){
    const [headX, headY] = this.head;
    let snakeBody = snake.location;
    if(this.snakeStatus.species === snake.snakeStatus.species){
      snakeBody = this.location.slice(0, -1);
    }
    return snakeBody.some(([x, y]) => x === headX && y === headY);
  }
}
