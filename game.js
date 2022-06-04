const { log } = require('console');

class Game {
  constructor() {
    this.currentScore = 0;
  }

  updateScore(aimMark) {
    this.currentScore += aimMark;
  }
  
  showScore(aimMark) {
    log('🎯 ', aimMark);
    log('Total Score: ', this.currentScore);
  }
  
  shouldContinue(_, intervalId) {
    if (this.currentScore >= 500) {
      clearInterval(intervalId);
    }
  }
}
exports.Game = Game;
