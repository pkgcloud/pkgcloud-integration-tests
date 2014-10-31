var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.hp.compute.createClient(config.getConfig('hp'));

client.on('log::*', logging.logFunction);

client.getServers(function (err, servers) {
  servers.forEach(function(f) {
    log.info(f.original);
  });
});
