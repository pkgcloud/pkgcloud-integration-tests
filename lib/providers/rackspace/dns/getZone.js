var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger('debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.getZone(process.argv[2], function (err, zone) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(zone.toJSON());
});
