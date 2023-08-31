/**
 * @typedef {{ execute: () => void }} Observer
 */

/**
 * effects cache
 *
 * @type {Array<Observer>}
 */
const contexts = [];

/**
 * create effect
 *
 * @param {() => void} fn - side effect to run
 */
function createEffect(fn) {
  const effect = {
    execute() {
      contexts.push(effect);
      fn();
      contexts.pop();
    },
  };

  effect.execute();
}

/**
 * reactive value with getter and setter
 *
 * @template T
 * @typedef {() => T} Getter
 * @typedef {(newValue: T) => void} Setter
 * @param {T} value
 * @returns {[Getter, Setter]}
 */
function createSignal(value) {
  /**
   * @type {Set<Observer>} subscriptions
   */
  const subscriptions = new Set();

  const read = () => {
    // get last item
    const observer = contexts[contexts.length - 1];
    // add effect to cache
    if (observer) subscriptions.add(observer);

    return value;
  };

  /**
   * @param {T} newValue
   */
  const write = (newValue) => {
    // change the params to the new value
    value = newValue;

    // execute all effects
    for (const observer of subscriptions) {
      observer.execute();
    }
  };

  return [read, write];
}
