class Score{
  constructor(){
    this.scores = 0;
  }

  increment(incrementValue){
    this.scores = this.scores + incrementValue;
    return this.scores;
  }
}
