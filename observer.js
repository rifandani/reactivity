// Subscribers, which can subscribe to and get notified by the observer object.
const observers = [];

// An observer object, which can be observed by subscribers in order to notify them.
const observer = Object.freeze({
  notify: (data) => observers.forEach((observer) => observer(data)),
  subscribe: (func) => observers.push(func),
  unsubscribe: (func) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});
