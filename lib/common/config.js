
var log = require('./logging').getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

exports.getConfig = function (provider, args) {

  var options = require('../../config/' + provider + '.config.json');

  var username, region, offset = 0;

  if (typeof args === 'string') {
    username = args;
  }
  else if (typeof args === 'object') {
    username = args[0];
    region = args[1];
  }
  else if (typeof args === 'number') {
    offset = args;
    username = process.argv[3 + offset];
    region = process.argv[4 + offset];
  }
  else if (!args) {
    username = process.argv[3];
    region = process.argv[4];
  }

  if (!username) {
    username = process.env.PKGCLOUD_TESTS_DEFAULT_USERNAME;
  }

  if (!username) {
    log.error('Default username not found, please set PKGCLOUD_TESTS_DEFAULT_USERNAME or provide username');
    process.exit(1);
  }

  var config = options[username];

  if (region) {
    config.region = region;
  }

  //log.info('Current Config', config);

  return config;

};