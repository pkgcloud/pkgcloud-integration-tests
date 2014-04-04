var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.getLoadBalancer(process.argv[2], function (err, lb) {
  if (err) {
    log.error(err);
    return;
  }

  lb.getErrorPage(function (err, page) {
    if (err) {
      log.error(err);
      return;
    }

    log.info(page);
  });
});
