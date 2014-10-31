pkgcloud-integration-tests
==========================

Integration tests for pkgcloud

### Setup

Add a `provider.config.json` file inside of the `config` directory. `provider` should be one of `rackspace`, `amazon`, etc. See the `rackspace.example.json` as a template for how to setup your file. You can have multiple accounts per provider, where each key is a different account.

It is not required to specify `region` in your config as you include this on the options for each call.

You'll also need to run `npm install` in the root of the tests to get the dependencies. 

#### Local pkgcloud setup

To setup a local pkgcloud install, run `npm link` in the `pkgcloud` directory, and then `npm link pkgcloud` in the root of  `pkgcloud-integration-tests`

### Provider selection

All of tests that are not provider specific, i.e. `lib/compute/getServers.js` require a provider name as the first argument after the script. For example:

```bash
$ node lib/compute/getServers.js openstack {{config-key-name}} {{region}}
```

The list of valid providers exactly matches the pkgcloud providers:

`azure`, `amazon`, `rackspace`, `hp`, `openstack`, `joyent`, `digitalocean`

### Running Tests

Generally, to run a test, you invoke node and the test you wish to run:

```bash
$ node lib/compute/getServers.js {{provider}} {{config-key-name}}
```

For providers & services that require a region as well, you can add that to the call:

```bash
$ node lib/compute/getServers.js {{provider}} {{config-key-name}} {{region}}
```

If the test in question has command line inputs, the username and region are the last arguments:

```bash
$ node lib/compute/createServer.js {{provider}} {{server-name}} {{flavorId}} {{imageId}} {{config-key-name}} {{region}}
```

