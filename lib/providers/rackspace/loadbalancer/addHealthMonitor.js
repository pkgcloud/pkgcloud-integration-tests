var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

client.getLoadBalancer(process.argv[2], function (err, lb) {
  if (err) {
    log.error(err);
    return;
  }

  lb.updateHealthMonitor({
    type: 'CONNECT',
    attemptsBeforeDeactivation: 10,
    delay: 3600,
    timeout: 300
  }, function (err) {
    if (err) {
      log.error(err);
      return;
    }
  });
});