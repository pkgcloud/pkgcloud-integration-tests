var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.amazon.storage.createClient(config.getConfig('amazon'));

client.on('log::*', logging.logFunction);

client.getContainers(function (err, containers) {
  if (err) {
    log.error(err);
    return;
  }

  containers.forEach(function(container) {
    log.info(container.name);
  });
});
