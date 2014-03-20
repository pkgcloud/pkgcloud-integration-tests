var pkgcloud = require('pkgcloud'),
    logging = require('../../../common/logging'),
    _ = require('underscore'),
    config = require('../../../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.importZone({
  contents: require('fs').readFileSync(process.argv[2]).toString(),
  contentType: 'BIND_9'
}, function (err, zone) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(zone.toJSON());
});