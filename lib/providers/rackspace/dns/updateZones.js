var pkgcloud = require('pkgcloud'),
    logging = require('../../../common/logging'),
    _ = require('underscore'),
    config = require('../../../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getZones(function (err, zones) {
  zones[0].emailAddress = 'foo@not1.com';
  zones[1].emailAddress = 'foo@not2.com';

  client.updateZones(zones, function(err, result) {
    if (err) {
      log.error(err);
      return;
    }

    log.info(result);
  });
});