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

describe('DNS Record Integration Tests', function () {

  var client, zoneName, adminEmail, apiUser, tempZone;
  var recName, recType, recData, tempRec;  


  before(function (done) {
    client = pkgcloud.providers.rackspace.dns.createClient(config.getConfig('rackspace', process.env['PKGCLOUD_TESTS_DEFAULT_USERNAME'])),
    zoneName = 'that.test.computer',
    adminEmail = 'test@test.com',
    recName = 'this',
    recData = '127.0.0.1',
    recType = 'A';
    client.createZone({name: zoneName, email: adminEmail}, function (err, zone) {
      should.not.exist(err);
      zone.should.be.an('object');
      tempZone = zone;
      done();
    });
  });

  after(function (done) {
    client.deleteZone(tempZone, {name: zoneName, email: adminEmail}, function (err) {
      if (!err) {
        console.log('\nDNS Zone teardown successful');
      }
      done();
    });
  });
  
  describe('createRecord tests', function () {
    
    it('createRecord is successful', function (done) {
      client.createRecord(tempZone, {name: zoneName, data: recData, type: recType}, function (err, rec) {
        should.not.exist(err);
        rec.should.be.an('object');
        tempRec = rec;
        done();
      });  
    });
    
    it('createRecord should fail with same params', function (done) {
      client.createRecord(tempZone, {name: zoneName, data: recData, type: recType}, function (err, rec) {
        should.not.exist(rec);
        err.should.be.an('object');
        done();
      });
    });
  });

  describe('updateRecord tests', function () {
    
    it('updateRecord should successfully modify Record', function (done) {
      tempRec.data = '192.168.0.1';
      client.updateRecord(tempZone, tempRec, function (err) {
        if(err) throw err;
        done();
      });
    });
    
    it('updateRecord should fail', function (done) {
      tempRec.data = '0';
      client.updateRecord(tempZone, tempRec, function (err) {
        should.exist(err);
        err.should.be.an('object');
        done();
      });
    });
  });

  describe('getRecord tests', function () {

    it('getRecord should retrieve correct record', function (done) {
      client.getRecord(tempZone, tempRec.id, function (err, rec) {
        rec.id.should.equal(tempRec.id);
        should.not.exist(err);
        done();
      });
    });

    it('getRecord should fail not found', function (done) {
      client.getRecord(tempZone, 'AW-01010', function (err, rec) {
        err.should.be.an('object');
        should.not.exist(rec);
        done();  
      });
    });
  });
  
});