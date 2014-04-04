var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.destroyContainer(process.argv[2], function (err) {
  if (err) {
    log.error(err);
  }
});