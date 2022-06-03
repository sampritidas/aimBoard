class EventNotifier {
  #registry;

  constructor() {
    this.#registry = {};
  }

  registerEvent(event, action) {
    this.#registry[event] = this.#registry[event] || [];
    this.#registry[event].push(action);
  }

  notify(event, ...args) {
    this.#registry[event].forEach(action => {
      action(...args);
    });
  }

  getRegisterList() {
    return Object.keys(this.#registry);
  }

  showRegister() {
    console.log(this.#registry); myEmitter.prependOnceListener
  }
}

exports.EventNotifier = EventNotifier;
