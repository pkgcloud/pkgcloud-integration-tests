var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', process.env['PKGCLOUD_TESTS_DEFAULT_USERNAME']));

client.on('log::*', logging.logFunction);

client.createRecord(process.argv[2], {
  name: process.argv[3],
  data: process.argv[4],
  type: process.argv[5]
}, function (err, record) {
  if (err) {
    log.error(err);
    return;
  }

  log.info(record.toJSON());
});