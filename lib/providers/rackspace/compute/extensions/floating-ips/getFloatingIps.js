var pkgcloud = require('pkgcloud'),
  logging = require('../../../../../common/logging'),
  config = require('../../../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getFloatingIps(function (err, ips) {
  if (err) {
    log.error(err);
    return;
  }
  ips.forEach(function (ip) {
    log.info(ip);
  });
});

