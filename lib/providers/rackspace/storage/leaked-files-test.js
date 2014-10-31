var pkgcloud = require('pkgcloud'),
  async = require('async'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace', 2));

client.on('log::*', logging.logFunction);

fs.readdir(process.argv[3], function(err, files) {
  async.forEachLimit(files, 5, function(item, next) {
//  var source = fs.createReadStream(process.argv[4]);

    var dest = client.upload({
      container: process.argv[2],
      remote: item,
      local: process.argv[3] + '/' + item
    }, function (err) {
      if (err) {
        log.error(err);
      }
    });

    dest.on('end', function () {
      log.info('Uploaded');
      setTimeout(function() {
        next();
      }, 20)
    });

//  source.pipe(dest);
  }, function(err) {
    log.info('Complete');
  });
});

