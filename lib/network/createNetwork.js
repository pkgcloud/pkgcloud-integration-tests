var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.network.createClient(config.getConfig(provider, 1));

client.on('log::*', logging.logFunction);

var options = {
  name: process.argv[3]
};

client.createNetwork(options, function(err, network) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(network.toJSON());
});
