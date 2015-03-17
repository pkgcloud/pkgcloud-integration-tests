var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.cdn.createClient(config.getConfig(provider, 1));

client.on('log::*', logging.logFunction);

client.getFlavor(process.argv[3], function (err, flavor) {
  if (err) {
    log.error(err);
    return;
  }
  log.info(flavor.toJSON());
});
