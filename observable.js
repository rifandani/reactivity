/**
 * @typedef {{ next: (value: any) => void; error: () => void; complete: () => void }} Observer
 */

/**
 * Observables allow you to define a way to produce a sequence of values over time.
 * Here is a simple Observable primitive that provides a way to emit a sequence of values to subscribers,
 * allowing them to react as those values are produced.
 */
class Observable {
  /**
   * @param {(observer: Observer) => () => void} producer
   */
  constructor(producer) {
    this.producer = producer;
  }

  /**
   * Method to allow a subscriber to subscribe to the observable
   *
   * @param {Observer} observer
   */
  subscribe(observer) {
    // Ensure the observer has the necessary functions
    if (typeof observer !== 'object' || observer === null) {
      throw new Error(
        'Observer must be an object with next, error, and complete methods',
      );
    }

    if (typeof observer.next !== 'function') {
      throw new Error('Observer must have a next method');
    }

    if (typeof observer.error !== 'function') {
      throw new Error('Observer must have an error method');
    }

    if (typeof observer.complete !== 'function') {
      throw new Error('Observer must have a complete method');
    }

    const unsubscribe = this.producer(observer);

    // Return an object with an unsubscribe method
    return {
      unsubscribe: () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe();
        }
      },
    };
  }
}
