var pkgcloud = require('pkgcloud'),
  logging = require('../../../../../common/logging'),
  config = require('../../../../../common/config'),
  fs = require('fs'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

fs.readFile(process.argv[3], function(err, data) {
  client.addKey({ name: process.argv[2], 'public_key': data.toString() }, function (err, key) {
    if (err) {
      log.error(err);
      return;
    }

    log.info(key);
  });
});
