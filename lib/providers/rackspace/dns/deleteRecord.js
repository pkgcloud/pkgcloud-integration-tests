var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

client.deleteRecord(process.argv[2], process.argv[3], function (err) {
  if (err) {
    log.error(err);
  }
});
