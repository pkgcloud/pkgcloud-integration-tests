var pkgcloud = require('pkgcloud'),
  logging = require('../../common/logging'),
  config = require('../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.compute.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.listKeys(function (err, keys) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(keys);
});
