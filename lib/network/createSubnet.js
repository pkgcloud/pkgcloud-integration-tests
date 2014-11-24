var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.network.createClient(config.getConfig(provider, 3));

client.on('log::*', logging.logFunction);

var options = {
  networkId: process.argv[3],
  cidr: process.argv[4],
  ip_version: process.argv[5]
};

client.createSubnet(options, function(err, subnet) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(subnet.toJSON());
});
