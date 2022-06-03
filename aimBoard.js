const EventEmitter = require('events');
const { Game } = require('./game.js');

const randomIndex = (list) => {
  return Math.floor(Math.random() * list.length);
};

const startTimer = (events, aimMarksList, notifier) => {
  const intervalId = setInterval(() => {
    const eventName = events[randomIndex(events)];
    const aimsMark = aimMarksList[randomIndex(aimMarksList)];
    notifier.emit(eventName, aimsMark, intervalId);
  }, 1000);
};

const registerEvents = (notifier, game) => {
  notifier.addListener('hit',
    (aimMark) => game.updateScore(aimMark));
  notifier.addListener('hit',
    (aimMark) => game.showScore(aimMark));
  notifier.addListener('hit',
    (_, interval) => game.shouldContinue(_, interval));
  notifier.addListener('miss',
    () => game.missMessage());
  notifier.addListener('miss',
    (_, interval) => game.stopGame(_, interval));
};

const startAiming = function () {
  const notifier = new EventEmitter();
  const game = new Game();
  
  registerEvents(notifier, game);
  const events = Object.keys(notifier._events);
  const allEvents = Array(6).fill('hit').concat(events);
  const aimMarksList = [10, 20, 40, 60, 80, 100];

  startTimer(allEvents, aimMarksList, notifier);
};

startAiming();

