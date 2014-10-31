var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../../common/logging'),
  config = require('../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.storage.createClient(config.getConfig(provider, 2));

client.on('log::*', logging.logFunction);

var dest = client.download({
  container: process.argv[3],
  remote: process.argv[4]
});

dest.pipe(process.stdout);