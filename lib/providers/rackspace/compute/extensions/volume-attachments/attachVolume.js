var pkgcloud = require('pkgcloud'),
  logging = require('../../../../../common/logging'),
  config = require('../../../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

client.attachVolume(process.argv[2], process.argv[3], function(err, attachment) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(attachment);
});

