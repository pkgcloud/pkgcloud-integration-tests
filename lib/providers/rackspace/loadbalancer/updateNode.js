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

  if (!lb.nodes.length) {
    return;
  }

  lb.nodes[0].condition = 'ENABLED';
  lb.nodes[0].weight = 5;

  lb.updateNode(lb, lb.nodes[0], function (err) {
    if (err) {
      log.error(err);
    }
  });
});
