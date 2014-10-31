var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.blockstorage.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.getVolumes(function (err, volumes) {
  if (err) {
    log.error(err);
  }

  volumes.forEach(function (volume) {
    log.info(volume.toJSON());
  });
});