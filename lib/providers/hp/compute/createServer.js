var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.compute.createClient(config.getConfig(provider, 5));

client.on('log::*', logging.logFunction);

var options = {
  name: process.argv[3],
  flavor: process.argv[4],
  image: process.argv[5],
  keyname: process.argv[6],
  networks: [{
    uuid: process.argv[7],
  }]
};

client.createServer(options, function(err, server) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(server.toJSON());
});
