var pkgcloud = require('pkgcloud'),
  logging = require('../../../common/logging'),
  config = require('../../../common/config'),
  _ = require('underscore');


var path = require('path'),
    fs = require('fs'),
    async = require('async'),
    chai = require('chai');


//var log = logging.getLogger(process.env.PKGCLOUD_LOG_LEVEL || 'debug');

var expect = chai.expect,
    should = chai.should();

describe('DNS Zone Integration Tests', function () {

  var client, zoneName, adminEmail, apiUser, tempZone; 


  before(function (done) {
    client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', process.env['PKGCLOUD_TESTS_DEFAULT_USERNAME']));
    zoneName = 'that.test.computer';
    adminEmail = 'test@test.com';
    done();
  });

  after(function (done) {
    client.deleteZone(tempZone, {name: zoneName, email: adminEmail}, function (err) {
      if (!err) {
        console.log('DNS Zone teardown successful');
      }
      done();
    });
  });
  
  describe('createZone tests', function () {
    
    it('createZone is successful', function (done) {
      client.createZone({name: zoneName, email: adminEmail}, function (err, zone) {
        should.not.exist(err);
        zone.should.be.an('object');
        tempZone = zone;
        done();
      });  
    });
    
    it('createZone should fail with same params', function (done) {
      client.createZone({name: zoneName, email: adminEmail}, function (err, zone) {
        should.not.exist(zone);
        err.should.be.an('object');
        done();
      });
    });
  });

  describe('updateZone tests', function () {
    
    it('updateZone should successfully modify Zone', function (done) {
      tempZone.emailAddress = 'changed@test.com';
      client.updateZone(tempZone, function (err) {
        if(err) throw err;
        done();
      });
    });
    
    it('updateZone should fail', function (done) {
      tempZone.emailAddress = '0';
      client.updateZone(tempZone, function (err) {
        should.exist(err);
        err.should.be.an('object');
        done();
      });
    });
  });

  describe('getZone tests', function () {

    it('getZone should retrieve correct zone', function (done) {
      client.getZone(tempZone.id, function (err, zone) {
        zone.id.should.equal(tempZone.id);
        should.not.exist(err);
        done();
      });
    });

    it('getZone should fail not found', function (done) {
      client.getZone('AW-01010', function (err, zone) {
        err.should.be.an('object');
        should.not.exist(zone);
        done();  
      });
    });
  });
  
});