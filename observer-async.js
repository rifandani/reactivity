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
    /**
     * @template T
     * @type {Array<(data: T) => void>}
     */
    this.observers = [];
  }

  /**
   * Subscribe to changes in the data
   *
   * @template T
   * @param {(data: T) => void} callback
   */
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.observers.push(callback);
  }

  /**
   * a method to remove the observer
   * @template T
   * @param {(data: T) => void} callback
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
   * @template T
   * @param {T} value
   */
  async notify(value) {
    // Call the subscribed function and wait for it to resolve
    const updates = this.observers.map(async (callback) => {
      await callback(value);
    });

    await Promise.allSettled(updates);
  }
}
