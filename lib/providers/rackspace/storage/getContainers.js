var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getContainers({
  loadCDNAttributes: true
}, function (err, containers) {
  if (err) {
    log.error(err);
    return;
  }

  containers.forEach(function(container) {
    log.info(container.toJSON());
  });
});
