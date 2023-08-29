const pubsub = {
  /**
   * internal state to store the events and callbacks
   *
   * @template T
   * @type {Record<string, Array<(data: T) => void>>} events map
   */
  events: {},
  /**
   * subscribe to an event
   *
   * @template T
   * @param {string} event - event name
   * @param {(data: T) => void} callback - function to invoke, when the event dispatched
   * @returns {() => void} - unsubscribe function which will delete the corresponding callback listener
   */
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);

    return () => {
      this.events[event].splice(callback.length - 1, 1);
    };
  },
  /**
   * same as `dispatchEvent`
   *
   * @template T
   * @param {string} event
   * @param {T} data - data to pass to the callback function that we passed during `subscribe`
   */
  publish(event, data) {
    if (this.events[event])
      this.events[event].forEach((callback) => callback(data));
  },
};
