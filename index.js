const assert = require('assert');

class Framework {
  constructor() {
    this.servers = [];
    this.bootloaders = [];

    ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGUSR2']
      .forEach(signal => process.on(signal, () => {
        this.stop()
          .then(() => process.exit());
      }));
  }

  addServer(instance) {
    assert(typeof instance.start === 'function', `Expecting a 'start' function but got ${typeof instance.start}`);
    assert(typeof instance.stop === 'function', `Expecting a 'stop' function but got ${typeof instance.stop}`);

    this.servers.push(instance);
  }

  setBootloaders(loaders) {
    this.bootloaders = loaders;
  }

  start() {
    return Promise.all(this.bootloaders)
      .then(() => Promise.all(this.servers.map(server => server.start())));
  }

  stop() {
    return Promise.all(this.servers.map(server => server.stop()));
  }

}

module.exports = Framework;