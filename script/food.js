class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.name = type.name;
    this.creditPoints =type.creditPoints; 
    this.energyLevel =type.energyLevel; 
  }

  position() {
    return [this.colId,this.rowId];
  }

  getName(){
    return this.name;
  }

  getCreditPoints(){
    return this.creditPoints;
  }

  get energy() {
    return this.energyLevel;
  }
}

const generateFoodType = function(){
  const type1 = {name: 'food', creditPoints: 5, energyLevel: 1};
  const type2 = {name: 'food', creditPoints: 5, energyLevel: 1};
  const type3 = {name: 'apple', creditPoints: 10, energyLevel: 0};
  const type4 = {name: 'apple', creditPoints: 10, energyLevel: 0};
  const type5 = {name: 'food', creditPoints: 5, energyLevel: 0};
  return [type1, type2, type3, type4, type5];
}