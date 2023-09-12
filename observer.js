/** @typedef {(data: any) => void} Observer */

// Subscribers, which can subscribe to and get notified by the observer object.
/** @type {Array<Observer>} */
const observers = [];

// An observer object, which can be observed by subscribers in order to notify them.
const observer = Object.freeze({
  /**
   * a method to notify all observers whenever a specific event occurs
   *
   * @param {any} data
   */
  notify: (data) => {
    observers.forEach((observer) => observer(data));
  },
  /**
   * a method in order to add observers to the observers list
   *
   * @param {Observer} func
   */
  subscribe: (func) => {
    observers.push(func);
  },
  /**
   *
   * @param {Observer} func
   */
  unsubscribe: (func) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});
