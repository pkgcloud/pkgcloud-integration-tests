var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.orchestration.createClient(config.getConfig(provider, 3));

client.on('log::*', logging.logFunction);

var stack = new pkgcloud.providers.openstack.orchestration.Stack(client, {
  id: process.argv[3],
  name: process.argv[4]
});

client.getResource(stack, process.argv[5], function (err, resource) {
  if (err) {
    log.error(err);
    return;
  }
  log.info(resource.toJSON());
});
