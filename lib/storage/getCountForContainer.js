var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.storage.createClient(config.getConfig(provider, 1));

client.on('log::*', logging.logFunction);

client.getFiles(process.argv[3], { limit: 1000000 }, function (err, files) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(files.length);
});
