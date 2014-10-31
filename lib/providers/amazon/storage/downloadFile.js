var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.amazon.storage.createClient(config.getConfig('amazon', 3));

client.on('log::*', logging.logFunction);

var stream = client.download({
  container: process.argv[2],
  remote: process.argv[3]
});

stream.on('error', function (err, response) {
  log.error(err, response);
});

stream.on('end', function () {
  log.info('File Downloaded')
});

stream.pipe(fs.createWriteStream(process.argv[4]));

