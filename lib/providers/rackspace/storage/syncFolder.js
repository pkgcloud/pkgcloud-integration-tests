var pkgcloud = require('pkgcloud'),
  log = require('../../common/logging'),
  _ = require('underscore'),
  config = require('../config'),
  amznConfig = require('../../amazon/config.json'),
  filed = require('filed'),
  fs = require('fs'),
  async = require('async');

var logger = log.getLogger('debug');

var client = pkgcloud.providers.amazon.storage.createClient({
  key: amznConfig.key,
  keyId: amznConfig.keyId
});

client.getContainer('kptest2', function (err, container) {
  if (err) {
    console.dir(err);
    process.exit(1);
    return;
  }

  container.getFiles(function(err, containerFiles) {

    fs.readdir('/Users/kenn5998/Downloads', function (err, files) {
      if (err) {
        console.dir(err);
        process.exit(1);
        return;
      }

      async.forEachLimit(files, 1, function (file, next) {

        var found = false;

        containerFiles.forEach(function (f) {
          if (f.name === file) {
            found = true;
          }
        });

        if (found) {
          console.log('File already uploaded, skipping...');
          return next();
        }

        fs.stat('/Users/kenn5998/Downloads/' + file, function (err, stat) {
          if (err) {
            return next(err);
          }

          if (stat.isDirectory()) {
            return;
            next();
          }

          console.log(file + ' uploading ...');

          client.upload({
            container: container.name,
            remote: file,
            local: '/Users/kenn5998/Downloads/' + file
          }, function (err) {
            next(err);
          });
        });
      }, function (err) {
        if (err) {
          console.dir(err);
          process.exit(1);
        }
      });
    });
  });


});
