var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  async = require('async'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace', 3));

client.on('log::*', logging.logFunction);

var items = [];

for (var i = 0; i < 100; i++) {
  items.push(i);
}

async.forEachSeries(items, function(item, next) {
  var source = fs.createReadStream(process.argv[4]);

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
    next();
  });

  source.pipe(dest);
}, function(err) {

});
