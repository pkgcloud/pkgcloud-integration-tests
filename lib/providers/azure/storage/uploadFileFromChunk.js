var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.azure.storage.createClient(config.getConfig('azure', 3));

client.on('log::*', logging.logFunction);

var source = fs.readFileSync(process.argv[4]);

var dest = client.upload({
  container: process.argv[2],
  remote: process.argv[3]
}, function (err) {
  if (err) {
    log.error(err);
  }
});

dest.on('end', function () {
  log.info('Uploaded');
});

dest.end(source);