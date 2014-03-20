var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

client.getImages(function (err, images) {
  if (err) {
    log.error(err);
    return;
  }

  images.forEach(function (image) {
    log.info(image.id);
    log.info('\t' + image.name);
  });
});
