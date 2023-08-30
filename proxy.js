function createProxy(target) {
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
