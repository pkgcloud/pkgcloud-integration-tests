var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.orchestration.createClient(config.getConfig(provider, 4));

client.on('log::*', logging.logFunction);

var options = {
  name: process.argv[3],
  templateUrl: process.argv[4],
  timeout: process.argv[5],
  environment: JSON.parse(process.argv[6])
};

client.createStack(options, function (err, stack) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(stack.toJSON());
});
