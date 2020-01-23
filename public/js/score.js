class Score{
  #scores;
  constructor(){
    this.#scores = 0;
  }

  increment(incrementValue){
    this.#scores = this.#scores + incrementValue;
  }

  get currentScores(){
    return this.#scores;
  }
}
