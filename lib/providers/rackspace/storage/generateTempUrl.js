var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace', 5));

client.on('log::*', logging.logFunction);

client.generateTempUrl(process.argv[2], process.argv[3], process.argv[4], process.argv[5], process.argv[6], function (err, result) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(result);
});
