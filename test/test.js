var SecObfuscate = require("../lib/sec-obfuscate");
var expect = require('expect.js');

describe("SecObfuscate", function() {
  var key = '0123456789abcdef0123456789abcdef',
    iv = '0123456789abcdef',
    cipher = 'aes-256-gcm';

	it("should throw exception if no password is provided", function() {
    expect(function(){
        var secObfuscate = new SecObfuscate();
      }).to.throwError();
	});
  
  it("should throw exception if blockSize is not a multiplication of 8", function() {
    expect(function(){
        var secObfuscate = new SecObfuscate(key, iv, cipher, 7);
      }).to.throwError();
	});
  
  it("should throw exception if a cipher is not available", function() {
    var secObfuscate = new SecObfuscate(key, iv),
    availableCiphers = secObfuscate.updateAvailableCiphers([cipher], ['some cipher']);
    
    expect(availableCiphers).not.to.contain(cipher);
	});
  
  it("should throw exception if a not available cipher is selected", function() {
    expect(function(){
      var secObfuscate = new SecObfuscate(key, iv, 'fdsfert43534cf3');
    }).to.throwError();
	});
  
  it("should encrypt values with a specific block size", function() {
    var blockSize = 64,
      secObfuscate = new SecObfuscate(key, iv, cipher, blockSize),
      number = 6,
      encryptedNumber = secObfuscate.encrypt(number);
      
      expect(encryptedNumber.length % (blockSize / 8)).to.eql(0);
	});

	it("should encrypt and decrypt a single number", function() {
		var secObfuscate = new SecObfuscate(key, iv),
      number = 512,
      encryptedNumber = secObfuscate.encrypt(number);
    var decryptedNumber = secObfuscate.decrypt(encryptedNumber);
      
		expect(number).to.eql(decryptedNumber);
	});

	it("should encrypt and decrypt a MAX_SAFE_INTEGER", function() {
		var secObfuscate = new SecObfuscate(key, iv),
      number = Number.MAX_SAFE_INTEGER,
      encryptedNumber = secObfuscate.encrypt(number);
    var decryptedNumber = secObfuscate.decrypt(encryptedNumber);
    
    expect(number).to.eql(decryptedNumber);
	});

});