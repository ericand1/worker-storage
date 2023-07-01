/* eslint-disable no-undef */
(() => {
  let storage = {};

  onmessage = (message) => {
    if (!message.data?.action) {
      throw Error('Invalid worker message payload, action is required.');
    }
    const result = { completed: true, action: message.data.action };

    switch (message.data.action) {
      case 'getItem':
        if (!message.data.key) {
          throw Error('getItem requires a key');
        }
        result.payload = storage[message.data.key];
        break;
      case 'setItem':
        if (!message.data.key) {
          throw Error('setItem requires a key');
        }
        storage[message.data.key] = message.data.payload;
        break;
      case 'removeItem':
        if (!message.data.key) {
          throw Error('removeItem requires a key');
        }
        delete storage[message.data.key];
        break;
      case 'clear':
        storage = {};
        break;
      default:
        throw Error('Invalid worker action');
    }

    postMessage(result);
  };
})();
