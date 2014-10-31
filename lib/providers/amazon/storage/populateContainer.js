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

client.getContainer(process.argv[2], function (err, container) {
  if (err) {
    log.error(err);
    return;
  }

  var count = randomInt(2500, 3500);

  log.info('Creating ' + count + ' files');

  var files = [];

  for (var i = 0; i < count; i++) {
    files.push(i);
  }

  async.forEachSeries(files, function(item, next) {
    log.info ('starting file');
    if (err) {
      next(err);
      return;
    }

    var stream = client.upload({
      remote: uuid.v4(),
      container: container.name,
      headers: {
        'content-type': 'text/plain'
      }
    }, function(err) {
      log.info('callback for upload');
    });

    stream.write(randomString({ length: randomInt(500, 5000) }));

    stream.on('end', function(err) {
      log.info('stream end');
      setImmediate(next);
    });

    stream.close();


  }, function(err) {
    log.error(err);
  });
});

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
