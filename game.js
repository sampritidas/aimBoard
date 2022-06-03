const { log } = require('console');

class Game {
  constructor() {
    this.currentScore = 0;
  }

  updateScore(aimMark) {
    this.currentScore += aimMark;
  }
  
  showScore(aimMark){
    log('🎯 ', aimMark);
    log('Total Score: ', this.currentScore);
  }
  
  shouldContinue(_, interval){
    if (this.currentScore >= 500) {
      this.stopGame(_, interval);
    }
  } 

  static stopGame(_, interval){
    clearInterval(interval);
  }
  
  static missMessage() {
    log('Sorry You Miss');
  }   
}

exports.Game = Game;
