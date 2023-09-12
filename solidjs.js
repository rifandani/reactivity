/**
 * @typedef {{ dependencies: Set<Set<Observer>>; execute: () => void }} Observer
 */

/**
 * effects cache
 *
 * @type {Array<Observer>}
 */
let contexts = [];

/**
 * Ignores tracking context inside its scope
 *
 * @template T
 * @param {() => T} fn the scope that is out of the tracking context
 * @returns {T} the return value of `fn`
 *
 * @description https://www.solidjs.com/docs/latest/api#untrack
 */
function untrack(fn) {
  // save the previous contexts
  const prevContexts = contexts;
  // clear contexts
  contexts = [];
  // run callback without the contexts
  const res = fn();
  // set back the previous contexts
  contexts = prevContexts;

  return res;
}

/**
 * clear observer dependencies
 * ONLY used in createEffect.
 *
 * @param {Observer} observer
 */
function cleanup(observer) {
  for (const dep of observer.dependencies) {
    dep.delete(observer);
  }

  observer.dependencies.clear();
}

/**
 * create and register effects
 *
 * @param {() => void} fn - side effect to run
 */
function createEffect(fn) {
  const effect = {
    dependencies: new Set(),
    execute() {
      cleanup(effect);
      contexts.push(effect);
      fn();
      contexts.pop();
    },
  };

  effect.execute();
}

/**
 * create reactive value with getter and setter
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

    if (observer) {
      // add effect to cache
      subscriptions.add(observer);
      observer.dependencies.add(subscriptions);
    }

    return value;
  };

  /**
   * @param {T} newValue
   */
  const write = (newValue) => {
    // change the params to the new value
    value = newValue;

    // execute all effects
    for (const observer of [...subscriptions]) {
      observer.execute();
    }
  };

  return [read, write];
}

/**
 * create derived state value
 *
 * @template T
 * @param {() => T} fn - derive value computations
 * @returns {() => T}
 */
function createMemo(fn) {
  const [signal, setSignal] = createSignal();
  createEffect(() => setSignal(fn()));
  return signal;
}
