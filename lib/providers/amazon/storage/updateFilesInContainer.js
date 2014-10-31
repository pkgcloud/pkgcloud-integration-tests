var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  uuid = require('node-uuid'),
  async = require('async'),
  randomString = require('random-string'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.amazon.storage.createClient(config.getConfig('amazon', 1));

client.on('log::*', logging.logFunction);

client.getFiles(process.argv[2], function (err, files) {
  if (err) {
    log.error(err);
    return;
  }

  async.forEachLimit(files, 5, function(item, next) {
    if (err) {
      next(err);
      return;
    }

    if (randomInt(0, 100) % 5 === 0) {
      log.info('Updating File', item.name);
      var stream = client.upload({
        remote: item.name,
        container: process.argv[2],
        headers: {
          'content-type': 'text/plain'
        }
      }, function(err) {
        log.info('callback for upload');
      });

      stream.write(randomString({ length: randomInt(500, 5000) }));

      stream.on('end', function(err) {
        log.info('stream end');
        next();
      });

      stream.close();
    }
    else {
      log.verbose('Skipping File', item.name);
      next();
    }
  }, function(err) {
    log.error(err);
  });
});

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
