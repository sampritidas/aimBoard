const { Game } = require('./game.js');
const { EventNotifier } = require('./eventNotifier.js');

const randomIndex = (list) => {
  return Math.floor(Math.random() * list.length);
};

const startTimer = (events, aimMarksList, notifier) => {
  const intervalId = setInterval(() => {
    const eventName = events[randomIndex(events)];
    const aimsMark = aimMarksList[randomIndex(aimMarksList)];
    notifier.notify(eventName, aimsMark, intervalId);
  }, 1000);
};

const registerEvents = (notifier, game) => {
  notifier.registerEvent('hit',
    (aimMark) => game.updateScore(aimMark));
  notifier.registerEvent('hit',
    (aimMark) => game.showScore(aimMark));
  notifier.registerEvent('hit',
    (_, interval) => game.shouldContinue(_, interval));
  notifier.registerEvent('miss',
    () => game.missMessage());
  notifier.registerEvent('miss',
    (_, interval) => game.stopGame(_, interval));
};

const startAiming = function () {
  const notifier = new EventNotifier();
  const game = new Game();
  
  registerEvents(notifier, game);
  const events = notifier.getRegisterList();
  const allEvents = Array(6).fill('hit').concat(events);
  const aimMarksList = [10, 20, 40, 60, 80, 100];

  startTimer(allEvents, aimMarksList, notifier);
};

startAiming();

