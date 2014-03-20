pkgcloud-integration-tests
==========================

Integration tests for pkgcloud

### Setup

Add a `provider.config.json` file inside of the `config` directory. `provider` should be one of `rackspace`, `amazon`, etc. See the `rackspace.example.json` as a template for how to setup your file. You can have multiple accounts per provider, where each key is a different account.

You'll also need to run `npm install` in the root of the tests to get the dependencies. If you're working against a local copy of `pkgcloud` mak

#### Local pkgcloud setup

To setup a local pkgcloud install, run `npm link` in the `pkgcloud` directory, and then `npm link pkgcloud` in the root of  `pkgcloud-integration-tests`

### Running Tests

Generally, to run a test, you invoke node and the test you wish to run:

```bash
$ node lib/providers/rackspace/dns/getZones.js my-user-name
```

For services that require a region as well, you can add that to the call:

```bash
$ node lib/providers/rackspace/compute/getServers.js my-user-name ord
```

If the test in question has command line inputs, the username and region are the last arguments:

```bash
$ node lib/providers/rackspace/dns/getZone.js 1234567 my-user-name
```

#### Running DNS tests for Rackspace

There are a number of integration tests for Rackspace DNS. It's recommended to look at the code and see the command line arguments for each test before proceeding.

- cloneZone
- createRecord
- createZone
- deleteRecord
- deleteRecords
- deleteZone
- deleteZones
- exportZone
- getRecord
- getRecords
- getZone
- getZoneChanges
- getZones
- importZone
- updateRecord
- updateZones
