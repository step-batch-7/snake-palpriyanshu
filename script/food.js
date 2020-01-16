class Food {
  #colId;
  #rowId;
  #name;
  #points;
  #growthFactor;
  constructor(colId, rowId, type) {
    this.#colId = colId;
    this.#rowId = rowId;
    this.#name = type.name;
    this.#points = type.points; 
    this.#growthFactor = type.growthFactor; 
  }

  get position() {
    return [this.#colId, this.#rowId].slice();
  }

  get status(){
    return {
      location: this.position.slice(),
      name: this.#name 
    }
  }

  get creditPoints(){
    return this.#points;
  }

  get growth() {
    return this.#growthFactor;
  }
}
