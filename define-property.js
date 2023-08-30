'use strict';

/**
 * define new key in an object
 *
 * @param {any} object - any object
 * @param {PropertyKey} key - new object key
 */
function defineProperty(object, key, value) {
  Object.defineProperties(object, {
    [`_${key}`]: {
      value,
      writable: true, // if and only if the value associated with the property may be changed with an assignment operator.
      // configurable: true, // if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
    },
    [key]: {
      get: function () {
        return this[`_${key}`];
      },
      set: function (newValue) {
        if (key === 'quantity') {
          this.total = newValue * this.price;
        }
        this[`_${key}`] = newValue;
      },
    },
  });
}
