var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.database.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.getFlavor(process.argv[2], function (err, flavor) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(flavor);
});
