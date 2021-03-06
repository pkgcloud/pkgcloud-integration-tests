var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.compute.createClient(config.getConfig(provider, 2));

client.on('log::*', logging.logFunction);

var options = {
  name: process.argv[3],
  server: process.argv[4]
};

client.createImage(options, function(err, image) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(image.toJSON());
});
