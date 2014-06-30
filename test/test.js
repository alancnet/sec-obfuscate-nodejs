var SecObfuscate = require("../lib/sec-obfuscate");
var expect = require('expect.js');

describe("SecObfuscate", function() {
  var password = 'password',
    cipher = 'aes-256-gcm';

	it("should throw exception if no password is provided", function() {
    expect(function(){
        var secObfuscate = new SecObfuscate();
      }).to.throwError();
	});
  
  it("should throw exception if blockSize is not a multiplication of 8", function() {
    expect(function(){
        var secObfuscate = new SecObfuscate(password, cipher, 7);
      }).to.throwError();
	});
  
  it("should throw exception if a cipher is not available", function() {
    var secObfuscate = new SecObfuscate(password),
    availableCiphers = secObfuscate.updateAvailableCiphers([cipher], ['some cipher']);
    
    expect(availableCiphers).not.to.contain(cipher);
	});
  
  it("should throw exception if a not available cipher is selected", function() {
    expect(function(){
      var secObfuscate = new SecObfuscate(password, 'fdsfert43534cf3');
    }).to.throwError();
	});
  
  it("should encrypt values with a specific block size", function() {
    var blockSize = 64,
      secObfuscate = new SecObfuscate(password, cipher, blockSize),
      number = 6,
      encryptedNumber = secObfuscate.encrypt(number);
      
      expect(encryptedNumber.length % (blockSize / 8)).to.eql(0);
	});

	it("should encrypt and decrypt a single number", function() {
		var secObfuscate = new SecObfuscate(password),
      number = 512,
      encryptedNumber = secObfuscate.encrypt(number);
    var decryptedNumber = secObfuscate.decrypt(encryptedNumber);
      
		expect(number).to.eql(decryptedNumber);
	});

});