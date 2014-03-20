var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

client.cloneZone(process.argv[2], { cloneName: process.argv[3] }, function (err, zone) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(zone.toJSON());
});
