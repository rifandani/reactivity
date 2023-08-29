// Subscribers, which can subscribe to and get notified by the observable object.
const observers = [];

// An observable object, which can be observed by subscribers in order to notify them.
const observable = Object.freeze({
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
