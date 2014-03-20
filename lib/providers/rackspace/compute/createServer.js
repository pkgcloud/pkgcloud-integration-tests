var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.compute.createClient(config.getConfig('rackspace', 3));

client.on('log::*', logging.logFunction);

// first we're going to get our flavors
client.getFlavors(function (err, flavors) {
  if (err) {
    log.error(err);
    return;
  }

  // then get our base images
  client.getImages(function (err, images) {
    if (err) {
      log.error(err);
      return;
    }

    // Pick a flavor
    var flavor = _.findWhere(flavors, { name: process.argv[3] });

    // Pick an image
    var image = _.findWhere(images, { name: process.argv[4] });

    // Create our first server
    var options = {
      name: process.argv[2],
      image: image,
      flavor: flavor
    };

    client.createServer(options, function(err, server) {
      if (err) {
        log.error(err);
        return;
      }

      log.info(server.original);
    });
  });
});
