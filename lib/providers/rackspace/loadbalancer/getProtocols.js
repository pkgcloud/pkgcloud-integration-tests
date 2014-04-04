var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getProtocols(function (err, protocols) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(protocols);
});