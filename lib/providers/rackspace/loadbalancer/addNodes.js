var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

// node lib/providers/rackspace/loadbalancer/addNodes.js 123456 '[{"address":"192.168.10.3","port":80,
//    "condition":"ENABLED"},{"address":"192.168.10.2","port":80,"condition":"ENABLED"}]' your-config-key ORD

client.addNodes(process.argv[2], JSON.parse(process.argv[3]), function (err, body) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(body);
});