var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

client.createImage({
  server: process.argv[2],
  name: process.argv[3] }, function (err, image) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(image.id);
});
