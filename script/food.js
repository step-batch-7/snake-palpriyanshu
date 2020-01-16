class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.name = type.name;
    this.creditPoints = type.creditPoints; 
    this.growthFactor = type.growthFactor; 
  }

  get position() {
    return [this.colId, this.rowId].slice();
  }

  getName(){
    return this.name;
  }

  getCreditPoints(){
    return this.creditPoints;
  }

  get growth() {
    return this.growthFactor;
  }
}
