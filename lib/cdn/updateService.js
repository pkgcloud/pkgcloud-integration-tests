var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.cdn.createClient(config.getConfig(provider, 2));

client.on('log::*', logging.logFunction);

client.getService(process.argv[3], function(err, service) {
  if (err) {
    log.error(err);
    return;
  }

  service.origins = [
    {
      origin: process.argv[4]
    }
  ];

  client.updateService(service, function (err, service) {
    if (err) {
      log.error(err);
      return;
    }
    log.info(service.toJSON());
  });
});