var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

// node lib/providers/rackspace/loadbalancer/addAccessList.js 123456 '[{"address":"67.160.41.4","type":"DENY"},
//    {"address":"67.160.41.5","type":"DENY"},{"address":"67.160.41.6","type":"ALLOW"}]' your-config-key ORD

client.getLoadBalancer(process.argv[2], function (err, lb) {

  if (err) {
    log.error(err);
    return;
  }

  lb.addAccessList(JSON.parse(process.argv[3]), function (err) {
    if (err) {
      log.error(err);
    }
  });
});