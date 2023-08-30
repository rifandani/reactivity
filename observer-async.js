'use strict';

/**
 * fake async operations
 *
 * @param {number} ms
 */
function sleep(ms) {
  console.info(`Sleeping for ${ms}ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ObserverAsync {
  constructor() {
    this.observers = [];
  }

  /**
   * Subscribe to changes in the data
   *
   * @param {() => void} callback
   */
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.observers.push(callback);
  }

  /**
   *
   * @param {() => void} callback
   */
  unsubscribe(callback) {
    [...this.observers].forEach((observer, index) => {
      if (observer === callback) {
        this.observers.splice(index, 1);
      }
    });
  }

  /**
   * notify and wait for all updates to complete
   *
   * @param {any} value
   */
  async notify(value) {
    // Call the subscribed function and wait for it to resolve
    const updates = this.observers.map(async (callback) => {
      await callback(value);
    });

    await Promise.allSettled(updates);
  }
}
