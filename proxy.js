/**
 * The Proxy object allows you to create an object that can be used in place of the original object,
 * but which may redefine fundamental Object operations like getting, setting, and defining properties.
 * Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs.
 *
 * @template T
 * @param {T} target - target object that we want to intercept
 */
function createProxy(target) {
  /**
   * @template T
   * @type {ProxyHandler<T>}
   */
  const handler = {
    get: function (target, property) {
      return target[property];
    },
    set: function (target, property, value) {
      if (property === 'total') {
        console.error('prohibit mutates the total directly');
        return false;
      }

      target[property] = value;

      if (property === 'quantity') {
        target.total = target.quantity * target.price;
      }

      return true; // indicates that the setting has been done successfully
    },
  };

  return new Proxy(target, handler);
}
