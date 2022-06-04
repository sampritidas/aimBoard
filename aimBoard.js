const EventEmitter = require('events');
const { Game } = require('./game.js');
const { log } = require('console');

const randomIndex = (list) => {
  return Math.floor(Math.random() * list.length);
};

const isEventMiss = (eventName, intervalId) => {
  if (eventName === 'miss') {
    log('Sorry You Miss');
    clearInterval(intervalId);
  }
};

const startTimer = (events, aimMarksList, notifier) => {
  const intervalId = setInterval(() => {
    const eventName = events[randomIndex(events)];
    const aimsMark = aimMarksList[randomIndex(aimMarksList)];
    isEventMiss(eventName, intervalId);
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
};

const startAiming = function () {
  const notifier = new EventEmitter();
  const game = new Game();
  
  registerEvents(notifier, game);
  const allEvents = Array(6).fill('hit').concat(['miss']);
  const aimMarksList = [10, 20, 40, 60, 80, 100];

  startTimer(allEvents, aimMarksList, notifier);
};

startAiming();
