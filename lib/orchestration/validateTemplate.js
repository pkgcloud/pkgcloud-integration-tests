var pkgcloud = require('pkgcloud'),
  logging = require('../common/logging'),
  config = require('../common/config'),
  template = require('./template.json'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var provider = process.argv[2];

var client = pkgcloud.orchestration.createClient(config.getConfig(provider));

client.on('log::*', logging.logFunction);

client.validateTemplate(template, function (err, response) {
  if (err) {
    log.error(err);
    return;
  }
  log.info(response);
});
