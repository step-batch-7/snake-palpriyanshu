class Score{
  constructor(){
    this.scores = 0;
  }

  increment(incrementValue){
    return this.scores += incrementValue;
  }
}