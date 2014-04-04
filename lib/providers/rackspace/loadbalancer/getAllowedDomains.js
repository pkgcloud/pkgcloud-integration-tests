var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getAllowedDomains(function (err, domains) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(domains);
});