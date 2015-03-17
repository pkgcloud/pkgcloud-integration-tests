var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.cdn.createClient(config.getConfig(provider, 4));

client.on('log::*', logging.logFunction);

var options = {
  name: process.argv[3],
  domains: [
    {
      domain: process.argv[4]
    }
  ],
  origins: [
    {
      origin: process.argv[5]
    }
  ],
  flavorId: process.argv[6]
}    

client.createService(options, function (err, service) {
  if (err) {
    log.error(err);
    return;
  }
  log.info(service.toJSON());
});
