var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  _ = require('underscore'),
  config = require('../../../common/config');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', 1));

client.on('log::*', logging.logFunction);

client.getRecords(process.argv[2], function (err, records) {
  if (err) {
    log.error(err);
    return;
  }

  var record = records[0];

  record.ttl = 2345;

  client.updateRecord(process.argv[2], record, function(err, data) {
    if (err) {
      log.error(err);
      return;
    }

    log.info(data);
  });
});