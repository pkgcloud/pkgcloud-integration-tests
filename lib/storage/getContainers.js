var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.storage.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.getContainers(function (err, containers) {
  if (err) {
    log.error(err);
  }

  containers.forEach(function(container) {
    log.info(container.toJSON());
  });
});