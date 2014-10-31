var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.amazon.storage.createClient(config.getConfig('amazon', 3));

client.on('log::*', logging.logFunction);

var source = fs.createReadStream(process.argv[4]);

var dest = client.upload({
  container: process.argv[2],
  remote: process.argv[3]
});

dest.on('error', function(err) {
  log.error(err);
});

dest.on('end', function () {
  log.info('Uploaded');
});

log.info(dest);
source.pipe(dest);