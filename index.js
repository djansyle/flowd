const assert = require('assert');

class Framework {
  constructor() {
    this.servers = [];
    ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGUSR2']
      .forEach(signal => process.on(signal, () => {
        this.stop();
      }))
  }

  addServer(instance) {
    assert(typeof instance.start === 'function', `Expecting a 'start' function but got ${typeof instance.start}`);
    assert(typeof instance.stop === 'function', `Expecting a 'stop' function but got ${typeof instance.stop}`);

    this.servers.push(instance);
  }

  start() {
    this.servers.forEach(server => server.start());
  }

  stop() {
    this.servers.forEach(server => server.stop());
  }

}

module.exports = Framework;