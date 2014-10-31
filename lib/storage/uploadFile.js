var pkgcloud = require('pkgcloud'),
  fs = require('fs'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.storage.createClient(config.getConfig(provider, 3));

client.on('log::*', logging.logFunction);

var source = fs.createReadStream(process.argv[5]);

var dest = client.upload({
  container: process.argv[3],
  remote: process.argv[4]
});

dest.on('error', function(err) {
  log.error(err);
});

dest.on('success', function (file) {
  log.info('Uploaded');
  log.info(file.toJSON());
});

source.pipe(dest);