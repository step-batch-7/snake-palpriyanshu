class Food {
  constructor(colId, rowId, type) {
    this.colId = colId;
    this.rowId = rowId;
    this.name = type.name;
    this.creditPoints =type.creditPoints; 
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
}

const generateFoodType = function(){
  const type1 = {name: 'food', creditPoints: 5};
  const type2 = {name: 'food', creditPoints: 5};
  const type3 = {name: 'apple', creditPoints: 10};
  const type4 = {name: 'apple', creditPoints: 10};
  const type5 = {name: 'food', creditPoints: 5};
  return [type1, type2, type3, type4, type5];
}