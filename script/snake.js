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

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  grow(){
    this.positions.unshift(this.previousTail)
  }

  get hasTouchedItself(){
    const [headX, headY] = this.positions[this.positions.length - 1];
    const snakeBody = this.positions.slice(0,-1);
    return snakeBody.some((pos) => pos[0] == headX && pos[1] == headY);
  }
}
