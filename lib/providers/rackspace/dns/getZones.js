var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');


var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace'));

client.on('logging::*', logging.logFunction);

client.getZones(function(err, zones) {
  if (err) {
    log.error(err);
    return;
  }

  zones.forEach(function(zone) {
    log.info(zone.toJSON());
  });
});