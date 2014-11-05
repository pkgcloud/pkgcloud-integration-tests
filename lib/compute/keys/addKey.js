var pkgcloud = require('pkgcloud'),
  logging = require('../../common/logging'),
  fs = require('fs'),
  config = require('../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.compute.createClient(config.getConfig(provider, 2));

client.on('log::*', logging.logFunction);

client.addKey({
  name: process.argv[3],
  public_key: fs.readFileSync(process.argv[4]).toString()
}, function (err, key) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(key);
});
