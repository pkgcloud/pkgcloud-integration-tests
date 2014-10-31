var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.amazon.storage.createClient(config.getConfig('amazon', 1));

client.on('log::*', logging.logFunction);

client.getContainer(process.argv[2], function (err, container) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(container.toJSON());
  if (container.files) {
    container.files.forEach(function(file) {
      log.info(file.toJSON());
    });
  }
});
