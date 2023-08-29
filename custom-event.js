/**
 * The cool thing about this is your events aren’t firing globally on the window.
 * You can fire an event directly on a class;
 * anything in your app can wire up event listeners directly to that class.
 */
class Counter extends EventTarget {
  constructor() {
    super();
  }

  /**
   * attach event listener
   *
   * @param {'decrement' | 'increment' | 'recolor'} event - name of the event
   * @param {EventListenerOrEventListenerObject | null} callback - event listener callback
   * @param {boolean | AddEventListenerOptions | undefined} options - event listener options
   */
  subscribe(event, callback, options) {
    this.addEventListener(event, callback, options);
  }

  decrement() {
    // fire event directly on the class
    this.dispatchEvent(new Event('decrement'));
  }

  increment() {
    // fire event directly on the class
    this.dispatchEvent(new Event('increment'));
  }

  /**
   * dispatch 'recolor' custom event
   *
   * @param {string} color - color in hex string
   */
  recolor(color) {
    // fire event directly on the class
    this.dispatchEvent(
      new CustomEvent('recolor', {
        detail: color,
      }),
    );
  }
}
