var pkgcloud = require('pkgcloud');

var client = pkgcloud.providers.rackspace.storage.createClient({
  username: 'rccc21',
  apiKey: 'a952e2c3fb3745f2b1ecadd3f3dc55ae',
  region: 'DFW'
});

var c, f;

client.getContainers(function(err, containers){
  if (err) {
    console.error(err);
    return;
  }

  containers.forEach(function(container) {
    console.log(container.name);

    if (container.name === 'Neutron') {
      c = container;
    }
  });

  if (!c) {
    console.error('Unable to find specified container');
    return;
  }

  client.getFiles(c, function(err, files) {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach(function (file) {
      console.log(file.name);

      if (file.name === 'Quantum.txt') {
        f = file;
      }
    });

    if (!f) {
      console.error('Uanble to find specified file');
      return;
    }

    var download = client.download({
      container: c,
      remote: f.name
    });

    download.pipe(process.stdout);
  });
});