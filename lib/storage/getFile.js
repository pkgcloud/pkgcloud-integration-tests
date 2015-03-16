var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.storage.createClient(config.getConfig(provider, 2));

client.on('log::*', logging.logFunction);

client.getFile(process.argv[3],process.argv[4], function (err, file) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(file.toJSON());
});
