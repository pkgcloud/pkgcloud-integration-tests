var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.createLoadBalancer({
  name: process.argv[2],
  protocol: {
    name: 'HTTP',
    port: 80
  },
  virtualIps: [
    {
      type: pkgcloud.providers.rackspace.loadbalancer.VirtualIpTypes.PUBLIC
    }
  ]
}, function (err, lb) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(lb.toJSON());
});