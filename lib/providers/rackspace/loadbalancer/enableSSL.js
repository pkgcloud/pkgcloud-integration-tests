var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  fs = require('fs'),
  async = require('async'),
  _ = require('underscore');

var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var client = pkgcloud.providers.rackspace.loadbalancer.createClient(config.getConfig('rackspace', 4));

client.on('log::*', logging.logFunction);

var sslConfig = {
  securePort: '443',
  enabled: true,
  secureTrafficOnly: false
};

var loadBalancerId = process.argv[2],
  keyFile = process.argv[3],
  certificateFile = process.argv[4],
  intermediateFile = process.argv[5];

function loadFile(file, key) {
  return function(next) {
    fs.readFile(file, function(err, contents) {
      if (err) {
        next(err);
        return;
      }

      sslConfig[key] = contents.toString();
      next();
    });
  }
}

async.parallel([
    loadFile(keyFile, 'privatekey'),
    loadFile(certificateFile, 'certificate'),
    loadFile(intermediateFile, 'intermediateCertificate')],
  function(err) {
    if (err) {
      log.error(err);
      return;
    }

    log.info('Loading SSL Certificate', sslConfig);

    client.getLoadBalancer(loadBalancerId, function (err, loadBalancer) {
      if (err) {
        log.error(err);
        return;
      }

      loadBalancer.updateSSLConfig(sslConfig, function (err) {
        if (err) {
          log.error(err);
        }
      });
    });
  });
