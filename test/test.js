var IdSecObfuscate = require("../lib/id-sec-obfuscate");
var expect = require('expect.js');

describe("IdSecObfuscate", function() {
  var password = 'password',
    cipher = 'aes-256-gcm';

	it("should throw exception if no password is provided", function() {
    expect(function(){
        var idSecObfuscate = new IdSecObfuscate();
      }).to.throwError();
	});
  
  it("should throw exception if blockSize is not a multiplication of 8", function() {
    expect(function(){
        var idSecObfuscate = new IdSecObfuscate(password, cipher, 7);
      }).to.throwError();
	});
  
  it("should throw exception if a cipher is not available", function() {
    var idSecObfuscate = new IdSecObfuscate(password),
    availableCiphers = idSecObfuscate.updateAvailableCiphers([cipher], ['some cipher']);
    
    expect(availableCiphers).not.to.contain(cipher);
	});
  
  it("should throw exception if a not available cipher is selected", function() {
    expect(function(){
      var idSecObfuscate = new IdSecObfuscate(password, 'fdsfert43534cf3');
    }).to.throwError();
	});
  
  it("should encrypt values with a specific block size", function() {
    var blockSize = 64,
      idSecObfuscate = new IdSecObfuscate(password, cipher, blockSize),
      number = 6,
      encryptedNumber = idSecObfuscate.encrypt(number);
      
      expect(encryptedNumber.length % (blockSize / 8)).to.eql(0);
	});

	it("should encrypt and decrypt a single number", function() {
		var idSecObfuscate = new IdSecObfuscate(password),
      number = 512,
      encryptedNumber = idSecObfuscate.encrypt(number);
    var decryptedNumber = idSecObfuscate.decrypt(encryptedNumber);
      
		expect(number).to.eql(decryptedNumber);
	});

});