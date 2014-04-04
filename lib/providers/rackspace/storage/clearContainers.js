var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore'),
  async = require('async'),
  http = require('http'),
  https = require('https');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.storage.createClient(config.getConfig('rackspace'));

client.on('log::*', logging.logFunction);

http.globalAgent.maxSockets = 100000;
https.globalAgent.maxSockets = 100000;

var success = 0, failed = 0;

client.getContainers(function(err, containers) {
  async.forEachLimit(containers, 1, function(container, next) {
    log.info('Deleting container: ' + container.name);
    client.destroyContainer(container, function(err) {
      if (!err) {
        success++;
        log.info('Deleted container: ' + container.name);
      }
      else {
        failed++;
      }
      next(err);
    });
  }, function(err) {
    if (err) {
      log.error(err);
    }
    log.info('Success: ' + success);
    log.info('Failed: ' + failed);
    process.exit();
  });
});
