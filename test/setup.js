// Starts the app
if (!global.server) {
  // eslint-disable-next-line global-require
  global.server = require('../src/app.js');
} else {
  global.server.server.close();
  // eslint-disable-next-line global-require
  global.server = require('../src/app.js');
}
