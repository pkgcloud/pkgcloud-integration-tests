var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.cdn.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.getFlavors(function (err, flavors) {
  if (err) {
    log.error(err);
    return;
  }
  flavors.forEach(function (flavor) {
    log.info(flavor.toJSON());
  });
});
