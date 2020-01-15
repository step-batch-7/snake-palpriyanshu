class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.name = type.name;
    this.creditPoints = type.creditPoints; 
    this.energyLevel = type.energyLevel; 
  }

  position() {
    return [this.colId, this.rowId].slice();
  }
  
  getCreditPoints(){
    return this.creditPoints;
  }

  get energy() {
    return this.energyLevel;
  }
}
