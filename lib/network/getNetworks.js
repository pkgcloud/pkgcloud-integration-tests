var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.network.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.getNetworks(function (err, networks) {
  if (err) {
    log.error(err);
    return;
  }
  networks.forEach(function (network) {
    log.info(network.toJSON());
  });
});
